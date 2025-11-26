'use client'

import React from 'react'
import { ProjectionRatesEntity } from '@/domain/entities/ProjectionRates'

interface AssumptionsCardProps {
  projectionRates: ProjectionRatesEntity
}

export const AssumptionsCard: React.FC<AssumptionsCardProps> = ({ projectionRates }) => {
  const assumptions = [
    {
      title: 'Crescimento Anual da Ocupação',
      value: `${projectionRates.occupancyGrowth}%`,
      description: 'Limitado a 85% máximo',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Aumento Anual dos Custos',
      value: `${projectionRates.costIncrease}%`,
      description: 'Inflação e reajustes',
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200'
    },
    {
      title: 'Aumento Anual das Receitas',
      value: `${projectionRates.revenueIncrease}%`,
      description: 'Crescimento do mercado',
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {assumptions.map((assumption, index) => (
        <div 
          key={index}
          className={`p-6 border rounded-lg text-center transition-all duration-200 hover:shadow-md hover:scale-105 ${assumption.bgColor}`}
        >
          <div className="text-sm text-muted-foreground mb-2 font-medium">
            {assumption.title}
          </div>
          <div className={`text-3xl font-bold mb-2 ${assumption.color}`}>
            {assumption.value}
          </div>
          <div className="text-xs text-muted-foreground">
            {assumption.description}
          </div>
        </div>
      ))}
    </div>
  )
}
