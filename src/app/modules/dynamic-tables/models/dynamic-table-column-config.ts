export class DynamicTableColumnConfig {
  /**
   * Field name
   */
  field!: string;
  /**
   * Header text
   */
  header!: string;
  /**
   * Footer text
   */
  footer?: string;
  /**
   * Data type
   */
  type?: string;
  /**
   * Sticky column
   */
  sticky?: "start" | "end";
  /**
   * Sortable column
   */
  sortable?: boolean;
  /**
   * Draggable column
   */
  draggable?: boolean;
}