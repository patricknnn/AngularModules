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

  public dataSource!: MatTableDataSource<any>;
  public displayColumns: string[] = [];
  public selection: SelectionModel<any> = new SelectionModel<any>(true, []);
  public resultsLength: number = 0;

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.initTableColumns();
  }

  public ngAfterViewInit(): void {
    if (this.tableConfig.paging) {
      this.dataSource.paginator = this.paginator ? this.paginator : null;
    }

    this.dataSource.sort = this.sort ? this.sort : null;
  }

  public initTableColumns(): void {
    if (this.tableConfig.selecting) {
      this.displayColumns.push('selectRowColumn');
    }

    this.columnConfig.forEach((column: DynamicTableColumnConfig) => {
      this.displayColumns.push(column.key);
    });
  }

  public applyFilter(event: Event): void {
    const htmlInputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.dataSource.filter = htmlInputElement.value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getCellContent(row: any, key: string): any {
    return key.split('.').reduce((value: any, key: string) => value?.[key], row);
  }

  public isFooterEmpty(): boolean {
    return this.columnConfig.some((column: DynamicTableColumnConfig) => column.footer);
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
}
