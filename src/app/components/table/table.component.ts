import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { TableService } from 'src/app/services/tables/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  columnConfig$: Observable<DynamicTableColumnConfig[]>;
  data$: Observable<any[]>;

  constructor(
    private tableService: TableService
  ) {
    this.columnConfig$ = this.tableService.getColumnConfig();
    this.data$ = this.tableService.getData();
  }

}
