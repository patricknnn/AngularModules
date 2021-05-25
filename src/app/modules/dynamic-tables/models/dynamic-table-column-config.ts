export class DynamicTableColumnConfig {
  /**
   * Field name
   */
  field: string;
  /**
   * Header text
   */
  header: string;
  /**
   * Footer text
   */
  footer: string | undefined;
  /**
   * Data type
   */
  type: string | undefined;
  /**
   * Sticky column
   */
  sticky: "start" | "end" | undefined;
  /**
   * Sortable column
   */
  sortable: boolean;
  /**
   * Draggable column
   */
  draggable: boolean;
  /**
   * Expandable column
   */
  expandable: boolean;

  /**
   * Initialize the DynamicTableColumnConfig instance
   * @param options Object containing options
   */
  constructor(options: {
    field: string,
    header?: string,
    footer?: string,
    type?: string,
    sticky?: "start" | "end",
    sortable?: boolean,
    draggable?: boolean,
    expandable?: boolean
  }) {
    this.field = options.field;
    this.header = options.header || options.field;
    this.footer = options.footer;
    this.type = options.type;
    this.sticky = options.sticky;
    this.sortable = options.sortable || false;
    this.draggable = options.draggable || false;
    this.expandable = options.expandable || false;
  }
}