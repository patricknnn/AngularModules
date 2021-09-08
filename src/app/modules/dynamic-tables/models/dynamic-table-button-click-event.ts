import { DynamicTableButton } from './dynamic-table-button';
import { DynamicTableColumnConfig } from './dynamic-table-column-config';

export interface DynamicTableButtonClickEvent {
  button: DynamicTableButton;
  row: any;
  column: DynamicTableColumnConfig;
}
