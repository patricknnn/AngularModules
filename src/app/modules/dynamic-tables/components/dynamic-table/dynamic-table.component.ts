import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DynamicTableColumnConfig } from '../../models/dynamic-table-column-config';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  animations: [
    trigger('expandRow', [
      state('collapsed, void', style({ height: '0px' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  @Input() columnConfig!: DynamicTableColumnConfig[];
  @Input() data!: any[];

  dataSource!: MatTableDataSource<any>;
  columnsToDisplay: string[] = [];

  activeSortField: string = "position";
  activeSortDirection: "asc" | "desc" = "asc";
  expandedRow: any;
  selection = new SelectionModel<any>(true, []);
  resultsLength: number = 0;
  isLoadingResults: boolean = false;
  color: "primary" | "accent" | "warn" = "accent";
  filterable: boolean = true;
  filterLabel: string = "Filter";
  filterPlaceholder: string = "Ex. Carbon";
  selectableRows: boolean = false;
  expandableRows: boolean = true;
  draggableRows: boolean = false;
  draggableColumns: boolean = false;
  pagination: boolean = false;
  paginationSizeOptions: number[] = [10, 25, 50];
  paginationSizeDefault: number = 10;
  tableClass: string = "mat-elevation-z4";
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  /**
   * Initialize dynamic table instance
   */
  constructor() { }

  /**
   * Called on instance initialization 
   */
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.initTableColumns();
  }

  /**
   * Called after view initialization
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator ? this.paginator : null;
    this.dataSource.sort = this.sort ? this.sort : null;
  }

  /**
 * Toggles selectableRows rows
 */
  toggleSelectableRows(): void {
    this.selectableRows = !this.selectableRows;
    this.initTableColumns();
  }

  /**
   * Initialize table columns
   */
  initTableColumns(): void {
    let columns = [];
    // add optional columns
    if (this.selectableRows) {
      columns.push("select");
    }
    // add field columns
    this.columnConfig.forEach((config) => {
      columns.push(config.name);
    });
    // set display columns
    this.columnsToDisplay = columns;
  }

  /**
   * Applies filter to table
   * @param event Filter event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Expands a table row
   * @param row Row to be expanded
   */
  expandRow(row: any): void {
    if (this.expandableRows) {
      this.expandedRow = this.expandedRow === row ? null : row;
    }
  }

  /**
   * Reorders column to dropped position
   * @param event Drop event
   */
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columnsToDisplay, event.previousIndex + 1, event.currentIndex);
  }

  /**
   * Whether the number of selected elements matches the total number of rows
   * @returns Wheter all rows are selected
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Returns number of selected rows
   * @returns Number of selected rowa
   */
  selectedRowCount(): number {
    return this.selection.selected.length;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection
   */
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }

  /**
   * Returns sum of all column values
   * @param column Column to get the sum of
   * @returns Sum of all column values
   */
  getColumnTotal(column: string): number {
    return this.data
      .map((t: { [x: string]: any; }) => t[column])
      .reduce((acc: number, value: number) => acc + value, 0);
  }

  /**
   * The label for the checkbox on the passed row
   * @param row Table row to get checkbox label for
   * @returns Checkbox label
   */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
