export interface YearlyProjection {
  year: number
  occupancy: number
  revenue: number
  costs: number
  profit: number
  cumulativeProfit: number
  cumulativeProfitFromInvestment: number
}

export interface FinancialResults {
  totalInitialInvestment: number
  totalPower: number
  monthlyConsumption: number
  monthlyRevenue: number
  totalMonthlyCosts: number
  monthlyProfit: number
  roi: number
  paybackMonths: number
  vpl: number
  tir: number
  projections: YearlyProjection[]
}

export class FinancialProjectionEntity {
  constructor(
    public readonly totalInitialInvestment: number,
    public readonly totalPower: number,
    public readonly monthlyConsumption: number,
    public readonly monthlyRevenue: number,
    public readonly totalMonthlyCosts: number,
    public readonly monthlyProfit: number,
    public readonly roi: number,
    public readonly paybackMonths: number,
    public readonly vpl: number,
    public readonly tir: number,
    public readonly projections: YearlyProjection[]
  ) {}

  public isViableInvestment(): boolean {
    return this.vpl > 0 && this.tir > 12 && this.paybackMonths <= 60 // 5 anos
  }

  public getRiskLevel(): 'baixo' | 'médio' | 'alto' {
    if (this.tir >= 20 && this.paybackMonths <= 36) return 'baixo'
    if (this.tir >= 15 && this.paybackMonths <= 48) return 'médio'
    return 'alto'
  }

  public getBreakevenYear(): number | null {
    const breakevenProjection = this.projections.find(
      p => p.cumulativeProfitFromInvestment >= 0
    )
    return breakevenProjection?.year || null
  }
}
