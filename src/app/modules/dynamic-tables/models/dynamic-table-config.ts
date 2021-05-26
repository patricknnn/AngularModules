import { DynamicTableButton } from "./dynamic-table-button";

/**
 * @description
 * Base DynamicTableConfig class 
 */
export class DynamicTableConfig {
  /**
   * Show loader
   */
  loader: boolean;
  /**
   * Loader color
   */
  loaderColor: "primary" | "accent" | "warn";
  /**
   * Show filter
   */
  filter: boolean;
  /**
   * Filter label
   */
  filterLabel: string;
  /**
   * Filter placeholder
   */
  filterPlaceholder: string;
  /**
   * Filter appearance
   */
  filterAppearance: "legacy" | "standard" | "fill" | "outline";
  /**
   * Filter color
   */
  filterColor: "primary" | "accent" | "warn";
  /**
   * Whether to use pagination
   */
  pagination: boolean;
  /**
   * Page size options
   */
  paginationSizeOptions: number[];
  /**
   * Default page size
   */
  paginationSizeDefault: number;
  /**
   * Active sort field
   */
  activeSortField: string | undefined;
  /**
   * Active sort direction
   */
  activeSortDirection: "asc" | "desc" | undefined;
  /**
   * Whether rows are selectable
   */
  selectRowColumn: boolean;
  /**
   * Whether selects are sticky
   */
  selectRowColumnSticky: boolean;
  /**
   * Whether rows have buttons
   */
  buttonRowColumn: boolean;
  /**
   * Buttons to display
   */
  buttonRowColumnButtons: DynamicTableButton[];
  /**
   * Whether button is sticky
   */
  buttonRowColumnSticky: boolean;
  /**
   * Whether rows are expandable
   */
  expandableRows: boolean;
  /**
   * Whether headers are sticky
   */
  stickyHeaders: boolean;
  /**
   * Whether footers are sticky
   */
  stickyFooters: boolean;
  /**
   * Custom table class
   */
  tableClass: string | undefined;

  /**
   * Initialize the DynamicTableConfig instance
   * @param options Object containing form control options
   */
  constructor(options: {
    loader?: boolean,
    loaderColor?: "primary" | "accent" | "warn",
    filter?: boolean,
    filterLabel?: string,
    filterPlaceholder?: string,
    filterAppearance?: "legacy" | "standard" | "fill" | "outline",
    filterColor?: "primary" | "accent" | "warn",
    pagination?: boolean,
    paginationSizeOptions?: number[],
    paginationSizeDefault?: number,
    activeSortField?: string,
    activeSortDirection?: "asc" | "desc",
    selectRowColumn?: boolean,
    selectRowColumnSticky?: boolean,
    buttonRowColumn?: boolean,
    buttonRowColumnSticky?: boolean,
    buttonRowColumnButtons?: DynamicTableButton[],
    expandableRows?: boolean,
    stickyHeaders?: boolean,
    stickyFooters?: boolean,
    tableClass?: string
  }) {
    this.loader = options.loader || false;
    this.loaderColor = options.loaderColor || "primary";
    this.filter = options.filter || false;
    this.filterLabel = options.filterLabel || "Filter";
    this.filterPlaceholder = options.filterPlaceholder || "";
    this.filterAppearance = options.filterAppearance || "standard";
    this.filterColor = options.filterColor || "primary";
    this.pagination = options.pagination || false;
    this.paginationSizeOptions = options.paginationSizeOptions || [10, 25, 50];
    this.paginationSizeDefault = options.paginationSizeDefault || 10;
    this.activeSortField = options.activeSortField;
    this.activeSortDirection = options.activeSortDirection;
    this.selectRowColumn = options.selectRowColumn || false;
    this.selectRowColumnSticky = options.selectRowColumnSticky || false;
    this.buttonRowColumn = options.buttonRowColumn || false;
    this.buttonRowColumnSticky = options.buttonRowColumnSticky || false;
    this.buttonRowColumnButtons = options.buttonRowColumnButtons || [];
    this.expandableRows = options.expandableRows || false;
    this.stickyHeaders = options.stickyHeaders || false;
    this.stickyFooters = options.stickyFooters || false;
    this.tableClass = options.tableClass;
  }
}