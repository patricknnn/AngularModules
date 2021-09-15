import { DynamicTableButton } from './dynamic-table-button';

export class DynamicTableColumnConfig {
  public constructor(
    public key: string = '',
    public header: string = '',
    public type: string = 'text',
    public footer: string = '',
    public sticky: 'start' | 'end' | 'false' = 'false',
    public sortable: boolean = true,
    public filterable: boolean = false,
    public buttons: DynamicTableButton[] = [],
  ) {
  }
}
