export class DynamicTableButtonClickEvent {
  button: string;
  row: string;

  constructor(button: string, row: any) {
    this.button = button;
    this.row = row;
  }
}