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
   * Enable/Disable sorting for entire table
   */
  sorting: boolean;
  /**
   * Active sort field
   */
  sortingActiveField: string | undefined;
  /**
   * Active sort direction
   */
  sortingActiveDirection: "asc" | "desc" | undefined;
  /**
   * Enable/Disable dragging for entire table
   */
  dragging: boolean;
  /**
   * Whether rows are selectable
   */
  selectableRows: boolean;
  /**
   * Whether selects are sticky
   */
  selectableRowsSticky: boolean;
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
    sorting?: boolean,
    sortingActiveField?: string,
    sortingActiveDirection?: "asc" | "desc",
    dragging?: boolean,
    selectableRows?: boolean,
    selectableRowsSticky?: boolean,
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
    this.sorting = options.sorting || false;
    this.sortingActiveField = options.sortingActiveField;
    this.sortingActiveDirection = options.sortingActiveDirection;
    this.dragging = options.dragging || false;
    this.selectableRows = options.selectableRows || false;
    this.selectableRowsSticky = options.selectableRowsSticky || false;
    this.expandableRows = options.expandableRows || false;
    this.stickyHeaders = options.stickyHeaders || false;
    this.stickyFooters = options.stickyFooters || false;
    this.tableClass = options.tableClass;
  }
}