export interface Station {
  id: number
  name: string
  power: number // kW
  unitPrice: number // R$
}

export class StationEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly power: number,
    public readonly unitPrice: number
  ) {
    this.validateStation()
  }

  private validateStation(): void {
    if (this.power <= 0) {
      throw new Error('A potência da estação deve ser maior que zero')
    }
    if (this.unitPrice <= 0) {
      throw new Error('O preço unitário deve ser maior que zero')
    }
    if (!this.name.trim()) {
      throw new Error('O nome da estação é obrigatório')
    }
  }

  public getTotalCost(): number {
    return this.unitPrice
  }

  public static fromPlainObject(station: Station): StationEntity {
    return new StationEntity(
      station.id,
      station.name,
      station.power,
      station.unitPrice
    )
  }

  public toPlainObject(): Station {
    return {
      id: this.id,
      name: this.name,
      power: this.power,
      unitPrice: this.unitPrice
    }
  }
}
