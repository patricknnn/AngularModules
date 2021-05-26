import { DynamicTableButton } from "./dynamic-table-button";

export class DynamicTableColumnConfig {
  /**
   * Field name
   */
  name: string;
  /**
   * Header text
   */
  header: string | undefined;
  /**
   * Footer text
   */
  footer: string | undefined;
  /**
   * Buttons
   */
  buttons: DynamicTableButton[] | undefined;
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
    name: string,
    header?: string,
    footer?: string,
    buttons?: DynamicTableButton[],
    type?: string,
    sticky?: "start" | "end",
    sortable?: boolean,
    draggable?: boolean,
    expandable?: boolean
  }) {
    this.name = options.name;
    this.header = options.header || options.name;
    this.footer = options.footer;
    this.buttons = options.buttons;
    this.type = options.type;
    this.sticky = options.sticky;
    this.sortable = options.sortable || false;
    this.draggable = options.draggable || false;
    this.expandable = options.expandable || false;
  }
}