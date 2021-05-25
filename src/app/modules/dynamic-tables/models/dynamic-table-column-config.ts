export class DynamicTableColumnConfig {
  field!: string;
  header!: string;
  footer?: string;
  type?: string;
  sticky?: "start" | "end";
  sortable?: boolean;
  draggable?: boolean;
}