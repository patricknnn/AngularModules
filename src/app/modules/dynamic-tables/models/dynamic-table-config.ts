export class DynamicTableConfig {
  public constructor(
    public filter: boolean = true,
    public filterLabel: string = 'Search',
    public filterPlaceholder: string = '',
    public filterAppearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'standard',
    public filterColor: 'primary' | 'accent' | 'warn' = 'accent',
    public paging: boolean = false,
    public pagingSizeOptions: number[] = [5, 10, 25],
    public pagingSizeDefault: number = 10,
    public sorting: boolean = true,
    public sortingActiveField: string = '',
    public sortingActiveDirection: 'asc' | 'desc' = 'asc',
    public selecting: boolean = false,
    public selectingSticky: 'start' | 'end' | 'false' = 'start',
    public stickyHeaders: boolean = true,
    public stickyFooters: boolean = true,
    public tableClass: string = '',
    public scrollX: string = '',
    public scrollY: string = ''
  ) { }
}
