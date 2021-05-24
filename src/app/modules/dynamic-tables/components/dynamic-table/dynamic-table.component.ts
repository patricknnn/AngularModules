import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  animations: [
    trigger('rowExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  data!: any[];
  dataSource!: MatTableDataSource<any>;
  columnsToDisplay: string[] = [];
  fieldsToDisplay: string[] = ['position', 'name', 'weight', 'symbol'];
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
  selectable: boolean = true;
  reorderable: boolean = true;
  sortable: boolean = false;
  expandable: boolean = false;
  pagination: boolean = false;
  pageSizeOptions: number[] = [10, 25, 50];
  pageSizeDefault: number = 10;
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
    this.data = ELEMENT_DATA;
    this.dataSource = new MatTableDataSource<any>(this.data);
    // add optional columns
    if (this.selectable) {
      this.columnsToDisplay.push("select");
    }
    // add field columns
    this.fieldsToDisplay.forEach((field) => {
      this.columnsToDisplay.push(field);
    });
  }

  /**
   * Called after view initialization
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator ? this.paginator : null;
    this.dataSource.sort = this.sort ? this.sort : null;
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
    if (this.expandable) {
      this.expandedRow = this.expandedRow === row ? null : row;
    }
  }

  /**
   * Reorders column to dropped position
   * @param event Drop event
   */
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columnsToDisplay, event.previousIndex + 1, event.currentIndex);
    let selectIndex = this.columnsToDisplay.indexOf("select");
    if (selectIndex) {
      moveItemInArray(this.columnsToDisplay, selectIndex, 0);
    }
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

const ELEMENT_DATA: any[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
