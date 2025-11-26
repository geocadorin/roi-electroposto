'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '@/components/ui'
import { Plus, TrendingUp, Calculator, Zap } from 'lucide-react'

import { StationForm } from '@/components/StationForm'
import { OperationalDataForm } from '@/components/OperationalDataForm'
import { FinancialResults } from '@/components/FinancialResults'
import { ChartsSection } from '@/components/ChartsSection'
import { ProjectionsTable } from '@/components/ProjectionsTable'
import { AssumptionsCard } from '@/components/AssumptionsCard'

import { Station, StationEntity } from '@/domain/entities/Station'
import { OperationalDataProps, OperationalDataEntity } from '@/domain/entities/OperationalData'
import { ProjectionRatesEntity } from '@/domain/entities/ProjectionRates'
import { CalculateROIUseCase } from '@/domain/usecases/CalculateROIUseCase'
import { formatCurrency } from '@/utils/formatters'

export default function ElectropostoROICalculator() {
  const [stations, setStations] = useState<Station[]>([
    { id: 1, name: 'Estação 1', power: 50, unitPrice: 45000 }
  ])
  
  const [infrastructureCost, setInfrastructureCost] = useState(30000)
  
  const [operationalData, setOperationalData] = useState<OperationalDataProps>({
    energyCost: 0.65,
    dailyHours: 12,
    initialOccupancy: 15,
    platformFee: 299,
    paymentGatewayFee: 3.5,
    taxes: 8.5,
    monthlyMaintenance: 800,
    staffCostPerShift: 2500,
    kwhPrice: 2.80
  })

  const projectionRates = useMemo(() => new ProjectionRatesEntity(5, 8, 12), [])

  const addStation = () => {
    if (stations.length < 10) {
      const newId = Math.max(...stations.map(s => s.id), 0) + 1
      setStations([...stations, {
        id: newId,
        name: `Estação ${newId}`,
        power: 50,
        unitPrice: 45000
      }])
    }
  }

  const removeStation = (id: number) => {
    if (stations.length > 1) {
      setStations(stations.filter(s => s.id !== id))
    }
  }

  const updateStation = (id: number, field: keyof Station, value: string | number) => {
    setStations(stations.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ))
  }

  const updateOperationalData = (field: keyof OperationalDataProps, value: number) => {
    setOperationalData(prev => ({ ...prev, [field]: value }))
  }

  const calculations = useMemo(() => {
    try {
      const stationEntities = stations.map(s => StationEntity.fromPlainObject(s))
      const operationalEntity = OperationalDataEntity.fromPlainObject(operationalData)
      
      const calculateROIUseCase = new CalculateROIUseCase()
      return calculateROIUseCase.execute(
        stationEntities,
        infrastructureCost,
        operationalEntity,
        projectionRates
      )
    } catch (error) {
      console.error('Erro no cálculo:', error)
      // Retorna valores padrão em caso de erro
      return null
    }
  }, [stations, infrastructureCost, operationalData, projectionRates])

  const totalInitialInvestment = stations.reduce((sum, s) => sum + s.unitPrice, 0) + infrastructureCost

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Calculadora ROI Eletroposto
          </h1>
          <p className="text-lg text-muted-foreground">
            Análise completa de investimento para estações de recarga elétrica
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seção de Investimento Inicial */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Investimento Inicial
              </CardTitle>
              <CardDescription>
                Configure suas estações de recarga e custos de infraestrutura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <StationForm
                  stations={stations}
                  onAddStation={addStation}
                  onRemoveStation={removeStation}
                  onUpdateStation={updateStation}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="infrastructure-cost">Custo com Infraestrutura (R$)</Label>
                    <Input
                      id="infrastructure-cost"
                      type="number"
                      min="0"
                      value={infrastructureCost}
                      onChange={(e) => setInfrastructureCost(Number(e.target.value))}
                      placeholder="30000"
                    />
                  </div>
                  <div>
                    <Label>Total do Investimento</Label>
                    <Input
                      value={formatCurrency(totalInitialInvestment)}
                      readOnly
                      className="font-bold bg-muted"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção de Custos Operacionais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Custos Operacionais
              </CardTitle>
              <CardDescription>
                Configure os custos mensais de operação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OperationalDataForm
                operationalData={operationalData}
                onUpdateOperationalData={updateOperationalData}
              />
            </CardContent>
          </Card>

          {/* Seção de Resultados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Resultados Financeiros
              </CardTitle>
              <CardDescription>
                Análise de viabilidade do investimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              {calculations ? (
                <FinancialResults calculations={calculations} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Ajuste os parâmetros para ver os resultados</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        {calculations && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Análise Gráfica</CardTitle>
              <CardDescription>
                Visualização da evolução financeira ao longo de 10 anos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartsSection projections={calculations.projections} />
            </CardContent>
          </Card>
        )}

        {/* Tabela de Projeções */}
        {calculations && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Projeção de 10 Anos</CardTitle>
              <CardDescription>
                Análise detalhada ano a ano considerando crescimento da ocupação, receitas e custos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectionsTable projections={calculations.projections} />
            </CardContent>
          </Card>
        )}

        {/* Premissas */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Premissas de Crescimento</CardTitle>
            <CardDescription>
              Taxas utilizadas nas projeções financeiras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AssumptionsCard projectionRates={projectionRates} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
