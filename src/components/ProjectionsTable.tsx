'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { YearlyProjection } from '@/domain/entities/FinancialProjection'
import { formatCurrency, formatPercent } from '@/utils/formatters'

interface ProjectionsTableProps {
  projections: YearlyProjection[]
}

export const ProjectionsTable: React.FC<ProjectionsTableProps> = ({ projections }) => {
  const getColorClass = (value: number) => {
    return value >= 0 ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Ano</TableHead>
            <TableHead className="font-semibold">Taxa Ocupação</TableHead>
            <TableHead className="font-semibold">Receita Anual</TableHead>
            <TableHead className="font-semibold">Custos Anuais</TableHead>
            <TableHead className="font-semibold">Lucro Anual</TableHead>
            <TableHead className="font-semibold">Lucro Acumulado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projections.map((projection) => (
            <TableRow 
              key={projection.year}
              className="hover:bg-muted/50 transition-colors duration-200"
            >
              <TableCell className="font-medium">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                  {projection.year}
                </span>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {formatPercent(projection.occupancy)}
                </span>
              </TableCell>
              <TableCell className="text-green-600 font-medium">
                {formatCurrency(projection.revenue)}
              </TableCell>
              <TableCell className="text-red-600 font-medium">
                {formatCurrency(projection.costs)}
              </TableCell>
              <TableCell className={`font-medium ${getColorClass(projection.profit)}`}>
                {formatCurrency(projection.profit)}
              </TableCell>
              <TableCell className={`font-bold ${getColorClass(projection.cumulativeProfit)}`}>
                {formatCurrency(projection.cumulativeProfit)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
