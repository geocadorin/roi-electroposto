'use client'

import React from 'react'
import { Input, Label } from '@/components/ui'
import { OperationalDataProps } from '@/domain/entities/OperationalData'

interface OperationalDataFormProps {
  operationalData: OperationalDataProps
  onUpdateOperationalData: (field: keyof OperationalDataProps, value: number) => void
}

export const OperationalDataForm: React.FC<OperationalDataFormProps> = ({
  operationalData,
  onUpdateOperationalData
}) => {
  const fields = [
    {
      key: 'energyCost' as keyof OperationalDataProps,
      label: 'Custo da Energia (R$/kWh)',
      step: 0.01,
      min: 0.01,
      placeholder: '0.65'
    },
    {
      key: 'dailyHours' as keyof OperationalDataProps,
      label: 'Horas de Funcionamento/Dia',
      step: 1,
      min: 1,
      max: 24,
      placeholder: '12'
    },
    {
      key: 'initialOccupancy' as keyof OperationalDataProps,
      label: 'Taxa de Ocupação Inicial (%)',
      step: 1,
      min: 0,
      max: 100,
      placeholder: '15'
    },
    {
      key: 'platformFee' as keyof OperationalDataProps,
      label: 'Mensalidade da Plataforma (R$)',
      step: 1,
      min: 0,
      placeholder: '299'
    },
    {
      key: 'paymentGatewayFee' as keyof OperationalDataProps,
      label: 'Gateway de Pagamento (%)',
      step: 0.1,
      min: 0,
      max: 20,
      placeholder: '3.5'
    },
    {
      key: 'taxes' as keyof OperationalDataProps,
      label: 'Impostos (%)',
      step: 0.1,
      min: 0,
      max: 50,
      placeholder: '8.5'
    },
    {
      key: 'monthlyMaintenance' as keyof OperationalDataProps,
      label: 'Manutenção Mensal (R$)',
      step: 1,
      min: 0,
      placeholder: '800'
    },
    {
      key: 'staffCostPerShift' as keyof OperationalDataProps,
      label: 'Funcionários por Turno (R$)',
      step: 1,
      min: 0,
      placeholder: '2500'
    }
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.key}>
            <Label htmlFor={field.key}>{field.label}</Label>
            <Input
              id={field.key}
              type="number"
              step={field.step}
              min={field.min}
              max={field.max}
              value={operationalData[field.key]}
              onChange={(e) => onUpdateOperationalData(field.key, Number(e.target.value))}
              placeholder={field.placeholder}
              className="transition-all duration-200 focus:scale-[1.02]"
            />
          </div>
        ))}
        
        <div className="md:col-span-2">
          <Label htmlFor="kwhPrice">Preço do kWh Cobrado (R$)</Label>
          <Input
            id="kwhPrice"
            type="number"
            step={0.01}
            min={0.01}
            value={operationalData.kwhPrice}
            onChange={(e) => onUpdateOperationalData('kwhPrice', Number(e.target.value))}
            placeholder="2.80"
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  )
}
