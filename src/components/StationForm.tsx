'use client'

import React from 'react'
import { Button, Input, Label } from '@/components/ui'
import { Plus, Minus } from 'lucide-react'
import { Station } from '@/domain/entities/Station'

interface StationFormProps {
  stations: Station[]
  onAddStation: () => void
  onRemoveStation: (id: number) => void
  onUpdateStation: (id: number, field: keyof Station, value: string | number) => void
}

export const StationForm: React.FC<StationFormProps> = ({
  stations,
  onAddStation,
  onRemoveStation,
  onUpdateStation
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Estações de Recarga</h3>
        <Button 
          onClick={onAddStation} 
          disabled={stations.length >= 10} 
          size="sm"
          className="transition-all duration-200 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Estação
        </Button>
      </div>
      
      {stations.map((station) => (
        <div 
          key={station.id} 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow duration-200"
        >
          <div>
            <Label htmlFor={`name-${station.id}`}>Nome</Label>
            <Input
              id={`name-${station.id}`}
              value={station.name}
              onChange={(e) => onUpdateStation(station.id, 'name', e.target.value)}
              placeholder="Ex: Estação Principal"
            />
          </div>
          <div>
            <Label htmlFor={`power-${station.id}`}>Potência (kW)</Label>
            <Input
              id={`power-${station.id}`}
              type="number"
              min="1"
              max="350"
              value={station.power}
              onChange={(e) => onUpdateStation(station.id, 'power', Number(e.target.value))}
              placeholder="50"
            />
          </div>
          <div>
            <Label htmlFor={`price-${station.id}`}>Preço Unitário (R$)</Label>
            <Input
              id={`price-${station.id}`}
              type="number"
              min="1000"
              value={station.unitPrice}
              onChange={(e) => onUpdateStation(station.id, 'unitPrice', Number(e.target.value))}
              placeholder="45000"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={() => onRemoveStation(station.id)}
              disabled={stations.length <= 1}
              variant="outline"
              size="sm"
              className="transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
