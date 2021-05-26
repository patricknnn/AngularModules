export class PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  data: string;
  text?: string;

  constructor(
    position: number,
    name: string,
    weight: number,
    symbol: string,
    data: string,
    text?: string
  ) {
    this.position = position;
    this.name = name;
    this.weight = weight;
    this.symbol = symbol;
    this.data = data;
    this.text = text;
  }
}