export interface ProjectionRatesProps {
  occupancyGrowth: number // % anual
  costIncrease: number // % anual
  revenueIncrease: number // % anual
}

export class ProjectionRatesEntity {
  constructor(
    public readonly occupancyGrowth: number,
    public readonly costIncrease: number,
    public readonly revenueIncrease: number
  ) {
    this.validateProjectionRates()
  }

  private validateProjectionRates(): void {
    if (this.occupancyGrowth < 0) {
      throw new Error('O crescimento da ocupação não pode ser negativo')
    }
    if (this.costIncrease < 0) {
      throw new Error('O aumento de custos não pode ser negativo')
    }
    if (this.revenueIncrease < 0) {
      throw new Error('O aumento de receita não pode ser negativo')
    }
  }

  public static fromPlainObject(rates: ProjectionRatesProps): ProjectionRatesEntity {
    return new ProjectionRatesEntity(
      rates.occupancyGrowth,
      rates.costIncrease,
      rates.revenueIncrease
    )
  }

  public toPlainObject(): ProjectionRatesProps {
    return {
      occupancyGrowth: this.occupancyGrowth,
      costIncrease: this.costIncrease,
      revenueIncrease: this.revenueIncrease
    }
  }
}
