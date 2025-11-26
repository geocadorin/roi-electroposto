export interface OperationalDataProps {
  energyCost: number // R$/kWh
  dailyHours: number
  initialOccupancy: number // %
  platformFee: number // R$
  paymentGatewayFee: number // %
  taxes: number // %
  monthlyMaintenance: number // R$
  staffCostPerShift: number // R$
  kwhPrice: number // R$/kWh
}

export class OperationalDataEntity {
  constructor(
    public readonly energyCost: number,
    public readonly dailyHours: number,
    public readonly initialOccupancy: number,
    public readonly platformFee: number,
    public readonly paymentGatewayFee: number,
    public readonly taxes: number,
    public readonly monthlyMaintenance: number,
    public readonly staffCostPerShift: number,
    public readonly kwhPrice: number
  ) {
    this.validateOperationalData()
  }

  private validateOperationalData(): void {
    if (this.energyCost <= 0) {
      throw new Error('O custo da energia deve ser maior que zero')
    }
    if (this.dailyHours <= 0 || this.dailyHours > 24) {
      throw new Error('As horas diárias devem estar entre 1 e 24')
    }
    if (this.initialOccupancy < 0 || this.initialOccupancy > 100) {
      throw new Error('A ocupação inicial deve estar entre 0% e 100%')
    }
    if (this.kwhPrice <= 0) {
      throw new Error('O preço do kWh deve ser maior que zero')
    }
    if (this.kwhPrice <= this.energyCost) {
      throw new Error('O preço de venda deve ser maior que o custo da energia')
    }
  }

  public static fromPlainObject(data: OperationalDataProps): OperationalDataEntity {
    return new OperationalDataEntity(
      data.energyCost,
      data.dailyHours,
      data.initialOccupancy,
      data.platformFee,
      data.paymentGatewayFee,
      data.taxes,
      data.monthlyMaintenance,
      data.staffCostPerShift,
      data.kwhPrice
    )
  }

  public toPlainObject(): OperationalDataProps {
    return {
      energyCost: this.energyCost,
      dailyHours: this.dailyHours,
      initialOccupancy: this.initialOccupancy,
      platformFee: this.platformFee,
      paymentGatewayFee: this.paymentGatewayFee,
      taxes: this.taxes,
      monthlyMaintenance: this.monthlyMaintenance,
      staffCostPerShift: this.staffCostPerShift,
      kwhPrice: this.kwhPrice
    }
  }
}
