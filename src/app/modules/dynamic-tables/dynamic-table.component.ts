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
    this.dataSource.paginator?.firstPage();
  }

  public resetTextFilter(): void {
    this.activeTextFilter = '';
    this.applyTextFilter();
  }

  public applyDropdownFilter(key: string, option: string): void {
    this.activeDropdownFilters[key] = option;

    this.filteredData = this.data.filter((row: any) => {
      for (const [objectKey, objectValue] of Object.entries(this.activeDropdownFilters)) {
        if (this.getCellContent(row, objectKey) != objectValue) {
          return false;
        }
      }
      return true;
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

  public areDropdownFiltersEmpty(): boolean {
    return !this.columnConfig.some((column: DynamicTableColumnConfig) => column.filterable);
  }

  public toggleDropdownFilters(): void {
    this.areDropdownFiltersExpanded = !this.areDropdownFiltersExpanded;
  }

  public getDropdownFilterOptions(key: string): string[] {
    return this.data
      .map((row: any) => {
        return this.getCellContent(row, key);
      })
      .filter((value: any, index: number, array: any[]) => {
        return array.indexOf(value) === index;
      });
  }

  public getCellContent(row: any, modelKey: string): any {
    return modelKey
      .split('.')
      .reduce((previousValue: any, currentValue: string) => previousValue?.[currentValue], row);
  }

  public isFooterEmpty(): boolean {
    return !this.columnConfig.some((column: DynamicTableColumnConfig) => column.footer);
  }

  public emitButtonClickEvent(
    button: DynamicTableButton,
    row: any,
    column: DynamicTableColumnConfig,
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
    this.dataSource.paginator = this.tableConfig.paging && this.paginator ? this.paginator : null;
    this.dataSource.sort = this.sort ? this.sort : null;
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      return JSON.stringify(data).toLowerCase().includes(filter);
    };
  }
}
