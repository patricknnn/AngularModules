/**
 * @description
 * Base dynamic table config class 
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
   * Wheter to use pagination
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
  activeSortField: string;
  /**
   * Active sort direction
   */
  activeSortDirection: "asc" | "desc";
  /**
   * Wheter rows are selectable
   */
  selectableRows: boolean;
  /**
   * Wheter rows are expandable
   */
  expandableRows: boolean;
  /**
   * Wheter headers are sticky
   */
  stickyHeaders: boolean;
  /**
   * Wheter footers are sticky
   */
  stickyFooters: boolean;
  /**
   * Custom table class
   */
  tableClass: string;

  /**
   * Initialize the FormControlBase instance
   * @param options Object containing form control options
   */
  constructor(options: {
    loader?: boolean;
    loaderColor?: "primary" | "accent" | "warn";
    filter?: boolean;
    filterLabel?: string;
    filterPlaceholder?: string;
    filterAppearance?: "legacy" | "standard" | "fill" | "outline";
    filterColor?: "primary" | "accent" | "warn";
    pagination?: boolean;
    paginationSizeOptions?: number[];
    paginationSizeDefault?: number;
    activeSortField?: string;
    activeSortDirection?: "asc" | "desc";
    selectableRows?: boolean;
    expandableRows?: boolean;
    stickyHeaders?: boolean;
    stickyFooters?: boolean;
    tableClass?: string;
  }) {
    this.loader = options.loader || true;
    this.loaderColor = options.loaderColor || "primary";
    this.filter = options.filter || true;
    this.filterLabel = options.filterLabel || "Filter";
    this.filterPlaceholder = options.filterPlaceholder || "";
    this.filterAppearance = options.filterAppearance || "standard";
    this.filterColor = options.filterColor || "primary";
    this.pagination = options.pagination || true;
    this.paginationSizeOptions = options.paginationSizeOptions || [10, 25, 50];
    this.paginationSizeDefault = options.paginationSizeDefault || 10;
    this.activeSortField = options.activeSortField || "";
    this.activeSortDirection = options.activeSortDirection || "asc";
    this.selectableRows = options.selectableRows || false;
    this.expandableRows = options.expandableRows || false;
    this.stickyHeaders = options.stickyHeaders || false;
    this.stickyFooters = options.stickyFooters || false;
    this.tableClass = options.tableClass || "";
  }
}