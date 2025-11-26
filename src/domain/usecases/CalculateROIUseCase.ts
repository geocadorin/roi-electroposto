import { StationEntity } from '../entities/Station'
import { OperationalDataEntity } from '../entities/OperationalData'
import { ProjectionRatesEntity } from '../entities/ProjectionRates'
import { FinancialProjectionEntity, YearlyProjection } from '../entities/FinancialProjection'

export class CalculateROIUseCase {
  execute(
    stations: StationEntity[],
    infrastructureCost: number,
    operationalData: OperationalDataEntity,
    projectionRates: ProjectionRatesEntity
  ): FinancialProjectionEntity {
    // Validações iniciais
    if (stations.length === 0) {
      throw new Error('É necessário pelo menos uma estação')
    }
    if (infrastructureCost < 0) {
      throw new Error('O custo de infraestrutura não pode ser negativo')
    }

    // Cálculos básicos
    const totalInitialInvestment = stations.reduce((sum, s) => sum + s.unitPrice, 0) + infrastructureCost
    const totalPower = stations.reduce((sum, s) => sum + s.power, 0)
    
    // Cálculos mensais do primeiro ano
    const monthlyConsumption = totalPower * operationalData.dailyHours * 30 * (operationalData.initialOccupancy / 100)
    const monthlyRevenue = monthlyConsumption * operationalData.kwhPrice
    
    const monthlyCosts = this.calculateMonthlyCosts(monthlyConsumption, monthlyRevenue, operationalData)
    const totalMonthlyCosts = Object.values(monthlyCosts).reduce((sum, cost) => sum + cost, 0)
    const monthlyProfit = monthlyRevenue - totalMonthlyCosts
    
    // Projeções de 10 anos
    const projections = this.calculateProjections(
      operationalData,
      projectionRates,
      monthlyRevenue,
      totalMonthlyCosts,
      totalInitialInvestment
    )
    
    // Cálculos financeiros
    const totalProfit10Years = projections.reduce((sum, p) => sum + p.profit, 0)
    const roi = ((totalProfit10Years - totalInitialInvestment) / totalInitialInvestment) * 100
    
    // Cálculo do payback mais preciso usando as projeções anuais
    let paybackMonths = Infinity
    if (monthlyProfit > 0) {
      paybackMonths = totalInitialInvestment / monthlyProfit
    } else {
      // Se o lucro mensal é negativo, calcular usando projeções anuais
      let cumulativeProfit = -totalInitialInvestment
      for (const projection of projections) {
        cumulativeProfit += projection.profit
        if (cumulativeProfit >= 0) {
          paybackMonths = projection.year * 12
          break
        }
      }
    }
    
    // VPL (Valor Presente Líquido) - Taxa de desconto 12% a.a.
    const vpl = this.calculateVPL(projections, totalInitialInvestment)
    
    // TIR (Taxa Interna de Retorno)
    const tir = this.calculateTIR(projections, totalInitialInvestment)
    
    return new FinancialProjectionEntity(
      totalInitialInvestment,
      totalPower,
      monthlyConsumption,
      monthlyRevenue,
      totalMonthlyCosts,
      monthlyProfit,
      roi,
      paybackMonths,
      vpl,
      tir,
      projections
    )
  }

  private calculateMonthlyCosts(
    monthlyConsumption: number,
    monthlyRevenue: number,
    operationalData: OperationalDataEntity
  ) {
    return {
      energy: monthlyConsumption * operationalData.energyCost,
      platform: operationalData.platformFee,
      paymentGateway: monthlyRevenue * (operationalData.paymentGatewayFee / 100),
      taxes: monthlyRevenue * (operationalData.taxes / 100),
      maintenance: operationalData.monthlyMaintenance,
      staff: operationalData.staffCostPerShift * 2 // 2 turnos
    }
  }

  private calculateProjections(
    operationalData: OperationalDataEntity,
    projectionRates: ProjectionRatesEntity,
    initialMonthlyRevenue: number,
    initialMonthlyCosts: number,
    totalInitialInvestment: number
  ): YearlyProjection[] {
    const projections: YearlyProjection[] = []
    let currentOccupancy = operationalData.initialOccupancy
    let currentRevenue = initialMonthlyRevenue * 12
    let currentCosts = initialMonthlyCosts * 12
    let cumulativeProfitRunning = -totalInitialInvestment

    for (let year = 1; year <= 10; year++) {
      if (year > 1) {
        currentOccupancy = Math.min(currentOccupancy * (1 + projectionRates.occupancyGrowth / 100), 85)
        currentRevenue = currentRevenue * (1 + projectionRates.revenueIncrease / 100)
        currentCosts = currentCosts * (1 + projectionRates.costIncrease / 100)
      }
      
      const yearlyProfit = currentRevenue - currentCosts
      cumulativeProfitRunning += yearlyProfit
      const cumulativeProfit = projections.reduce((sum, p) => sum + p.profit, 0) + yearlyProfit
      
      projections.push({
        year,
        occupancy: currentOccupancy,
        revenue: currentRevenue,
        costs: currentCosts,
        profit: yearlyProfit,
        cumulativeProfit,
        cumulativeProfitFromInvestment: cumulativeProfitRunning
      })
    }

    return projections
  }

  private calculateVPL(projections: YearlyProjection[], totalInitialInvestment: number): number {
    const discountRate = 0.12
    let vpl = -totalInitialInvestment
    
    projections.forEach(p => {
      vpl += p.profit / Math.pow(1 + discountRate, p.year)
    })
    
    return vpl
  }

  private calculateTIR(projections: YearlyProjection[], totalInitialInvestment: number): number {
    let tir = 0.1 // Chute inicial de 10%
    let iterations = 0
    const maxIterations = 100
    
    while (iterations < maxIterations) {
      let npv = -totalInitialInvestment
      let derivativeNpv = 0
      
      projections.forEach(p => {
        const factor = Math.pow(1 + tir, p.year)
        npv += p.profit / factor
        derivativeNpv -= p.year * p.profit / (factor * (1 + tir))
      })
      
      if (Math.abs(npv) < 0.01) break
      tir = tir - npv / derivativeNpv
      iterations++
    }
    
    return tir * 100
  }
}
