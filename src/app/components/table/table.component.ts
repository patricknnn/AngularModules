import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { TableService } from 'src/app/services/tables/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  tableConfig: DynamicTableConfig;
  columnConfig: DynamicTableColumnConfig[];
  data$: Observable<any[]>;

  constructor(
    private tableService: TableService
  ) {
    this.tableConfig = this.tableService.getTableConfig();
    this.columnConfig = this.tableService.getColumnConfig();
    this.data$ = this.tableService.getData();
  }

  handleSelectionChangeEvent(event: any): void {
    console.log(event);
  }

  handleButtonClickEvent(event: any): void {
    console.log(event);
  }

}
