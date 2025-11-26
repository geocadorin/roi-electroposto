'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { YearlyProjection } from '@/domain/entities/FinancialProjection'
import { formatCurrency } from '@/utils/formatters'

interface ChartsSectionProps {
  projections: YearlyProjection[]
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ projections }) => {
  const formatTooltipValue = (value: number) => formatCurrency(value)
  
  const formatYAxisTick = (value: number) => {
    if (Math.abs(value) >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`
    }
    if (Math.abs(value) >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}K`
    }
    return formatCurrency(value).replace('R$', 'R$')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Linha - Receita vs Custos */}
      <div className="p-6 border rounded-lg bg-card">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Receita vs Custos (10 anos)</h3>
          <p className="text-sm text-muted-foreground">
            Linha azul mostra o lucro acumulado começando do investimento inicial
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={projections} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tickFormatter={formatYAxisTick}
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2} 
              name="Receita Anual"
              dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="costs" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2} 
              name="Custos Anuais"
              dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="cumulativeProfitFromInvestment" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={3} 
              name="Lucro Acumulado"
              dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Barras - Lucro Acumulado */}
      <div className="p-6 border rounded-lg bg-card">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Lucro Acumulado por Ano</h3>
          <p className="text-sm text-muted-foreground">
            Evolução do lucro acumulado ao longo dos anos
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={projections} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tickFormatter={formatYAxisTick}
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Bar 
              dataKey="cumulativeProfit" 
              fill="hsl(var(--chart-4))" 
              name="Lucro Acumulado"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
