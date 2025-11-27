'use client'

import React from 'react'
import { FinancialProjectionEntity } from '@/domain/entities/FinancialProjection'
import { formatPercent, formatCurrencyCompact } from '@/utils/formatters'

interface FinancialResultsProps {
  calculations: FinancialProjectionEntity
}

export const FinancialResults: React.FC<FinancialResultsProps> = ({ calculations }) => {
  const getColorClass = (value: number, isPositive: boolean = true) => {
    if (isPositive) {
      return value >= 0 ? 'text-green-600' : 'text-red-600'
    }
    return value < 0 ? 'text-green-600' : 'text-red-600'
  }

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'baixo': return 'bg-green-100 text-green-800 border-green-200'
      case 'médio': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'alto': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const results = [
    {
      label: 'Consumo Mensal',
      value: `${calculations.monthlyConsumption.toFixed(0)} kWh`,
      color: 'text-blue-600'
    },
    {
      label: 'Receita Mensal',
      value: formatCurrencyCompact(calculations.monthlyRevenue),
      color: 'text-green-600'
    },
    {
      label: 'Custos Mensais',
      value: formatCurrencyCompact(calculations.totalMonthlyCosts),
      color: 'text-red-600'
    },
    {
      label: 'Lucro Mensal',
      value: formatCurrencyCompact(calculations.monthlyProfit),
      color: getColorClass(calculations.monthlyProfit)
    },
    {
      label: 'ROI (10 anos)',
      value: formatPercent(calculations.roi),
      color: getColorClass(calculations.roi)
    },
    {
      label: 'Payback',
      value: calculations.paybackMonths === Infinity ? 'Não viável' : `${calculations.paybackMonths.toFixed(1)} meses`,
      color: calculations.paybackMonths === Infinity ? 'text-red-600' : calculations.paybackMonths <= 36 ? 'text-green-600' : calculations.paybackMonths <= 60 ? 'text-yellow-600' : 'text-red-600'
    },
    {
      label: 'VPL',
      value: formatCurrencyCompact(calculations.vpl),
      color: getColorClass(calculations.vpl)
    },
    {
      label: 'TIR',
      value: formatPercent(calculations.tir),
      color: calculations.tir >= 12 ? 'text-green-600' : 'text-yellow-600'
    }
  ]

  const riskLevel = calculations.getRiskLevel()
  const breakevenYear = calculations.getBreakevenYear()
  const isViable = calculations.isViableInvestment()

  return (
    <div className="space-y-6">
      {/* Indicadores de Viabilidade */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${isViable ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
          {isViable ? '✓ Investimento Viável' : '✗ Investimento Não Viável'}
        </span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskBadgeColor(riskLevel)}`}>
          Risco: {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
        </span>
        {breakevenYear && (
          <span className="px-3 py-1 rounded-full text-sm font-medium border bg-blue-100 text-blue-800 border-blue-200">
            Breakeven: Ano {breakevenYear}
          </span>
        )}
      </div>

      {/* Grid de Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {results.map((result, index) => (
          <div 
            key={index} 
            className="p-3 md:p-4 border rounded-lg hover:shadow-md transition-all duration-200 hover:scale-105 min-h-[75px] md:min-h-[80px] flex flex-col justify-between"
          >
            <div className="text-xs md:text-sm text-muted-foreground mb-1 leading-tight">{result.label}</div>
            <div className={`text-sm md:text-base lg:text-lg font-bold ${result.color} break-words leading-tight`}>
              {result.value}
            </div>
          </div>
        ))}
      </div>

      {/* Análise Rápida */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <h4 className="font-semibold mb-2">Análise Rápida</h4>
        <div className="text-sm space-y-1">
          <p>
            • <strong>Viabilidade:</strong> {isViable ? 'O investimento apresenta indicadores positivos' : 'O investimento apresenta riscos elevados'}
          </p>
          <p>
            • <strong>Retorno:</strong> {calculations.paybackMonths === Infinity ? 'Investimento não se paga' : calculations.paybackMonths <= 36 ? 'Payback rápido, excelente' : calculations.paybackMonths <= 60 ? 'Payback moderado, aceitável' : 'Payback longo, considere revisar'}
          </p>
          <p>
            • <strong>Rentabilidade:</strong> {calculations.tir >= 20 ? 'Muito rentável' : calculations.tir >= 15 ? 'Rentabilidade boa' : calculations.tir >= 12 ? 'Rentabilidade mínima' : 'Rentabilidade insuficiente'}
          </p>
        </div>
      </div>
    </div>
  )
}
