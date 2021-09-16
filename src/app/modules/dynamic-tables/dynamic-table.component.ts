import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DynamicTableButton } from './models/dynamic-table-button';
import { DynamicTableButtonClickEvent } from './models/dynamic-table-button-click-event';
import { DynamicTableColumnConfig } from './models/dynamic-table-column-config';
import { DynamicTableConfig } from './models/dynamic-table-config';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  @Input() public tableConfig!: DynamicTableConfig;
  @Input() public columnConfig!: DynamicTableColumnConfig[];
  @Input() public data!: any[];

  @Output() public selectionChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() public buttonClick: EventEmitter<DynamicTableButtonClickEvent> = new EventEmitter<DynamicTableButtonClickEvent>();
  @Output() public rowClick: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatTable) public table?: MatTable<any>;
  @ViewChild(MatPaginator) public paginator?: MatPaginator;
  @ViewChild(MatSort) public sort?: MatSort;

  public filteredData?: any[];
  public dataSource!: MatTableDataSource<any>;
  public displayColumns: string[] = [];
  public selection: SelectionModel<any> = new SelectionModel<any>(true, []);
  public resultsLength: number = 0;
  public areDropdownFiltersExpanded: boolean = false;
  public activeDropdownFilters: any = {};
  public activeTextFilter: string = '';

  public ngOnInit(): void {
    this.filteredData = this.data;
    this.initTableColumns();
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.createDataSource();
    });
  }

  public initTableColumns(): void {
    if (this.tableConfig.selecting) {
      this.displayColumns.push('selectRowColumn');
    }

    this.columnConfig.forEach((column: DynamicTableColumnConfig) => {
      this.displayColumns.push(column.key);
    });
  }

  public applyTextFilter(): void {
    this.dataSource.filter = this.activeTextFilter.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public resetTextFilter(): void {
    this.activeTextFilter = '';
    this.applyTextFilter();
  }

  public applyDropdownFilter(key: string, option: string): void {
    this.activeDropdownFilters[key] = option;

    this.filteredData = this.data.filter((row: any) => {
      let isPassed: boolean = true;
      for (const [key, value] of Object.entries(this.activeDropdownFilters)) {
        if (this.getCellContent(row, key) != value) {
          isPassed = false;
        }
      }
      return isPassed;
    });

    this.createDataSource();
    this.applyTextFilter();
  }

  public resetDropdownFilters(): void {
    this.activeDropdownFilters = {};
    this.filteredData = this.data;
    this.createDataSource();
    this.applyTextFilter();
  }

  public toggleDropdownFilters(): void {
    this.areDropdownFiltersExpanded = !this.areDropdownFiltersExpanded;
  }

  public areDropdownFiltersEmpty(): boolean {
    return !this.columnConfig.some(
      (column: DynamicTableColumnConfig) => column.filterable
    );
  }

  public getFilterOptions(key: string): string[] {
    return this.data
      .map((row) => {
        return this.getCellContent(row, key);
      })
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
  }

  public getCellContent(row: any, key: string): any {
    return key
      .split('.')
      .reduce((value: any, key: string) => value?.[key], row);
  }

  public isFooterEmpty(): boolean {
    return this.columnConfig.some(
      (column: DynamicTableColumnConfig) => column.footer
    );
  }

  public emitButtonClickEvent(
    button: DynamicTableButton,
    row: any,
    column: DynamicTableColumnConfig
  ): void {
    this.buttonClick.emit({ button, row, column });
  }

  public emitRowClickEvent(row: any): void {
    this.rowClick.emit(row);
  }

  public toggleSelectedRow(row: any): void {
    this.selection.toggle(row);

    this.selectionChange.emit(this.selection.selected);
  }

  public toggleSelectAllRows(): void {
    this.areAllRowsSelected()
      ? this.selection.clear()
      : this.selection.select(...this.dataSource.data);

    this.selectionChange.emit(this.selection.selected);
  }

  public areAllRowsSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  private createDataSource(): void {
    this.dataSource = new MatTableDataSource<any>(this.filteredData);

    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      return JSON.stringify(data).toLowerCase().includes(filter);
    };

    if (this.tableConfig.paging) {
      this.dataSource.paginator = this.paginator ? this.paginator : null;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
}
