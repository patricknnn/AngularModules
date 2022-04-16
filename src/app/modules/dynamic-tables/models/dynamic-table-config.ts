import { MatColor } from "src/app/enums/material/mat-color";
import { MatFormAppearance } from "src/app/enums/material/mat-form-appearance";

export class DynamicTableConfig {
  public constructor(
    public filter: boolean = true,
    public filterLabel: string = 'Search',
    public filterPlaceholder: string = '',
    public filterAppearance: MatFormAppearance = MatFormAppearance.STANDARD,
    public filterColor: MatColor = MatColor.ACCENT,
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
    public scrollY: string = '',
  ) { }
}
