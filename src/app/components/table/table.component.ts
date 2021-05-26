import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { TableService } from 'src/app/services/tables/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  tableConfig: DynamicTableConfig;
  columnConfig: DynamicTableColumnConfig[];
  data$: Observable<any[]>;

  @ViewChild("outlet", { read: ViewContainerRef }) outletRef?: ViewContainerRef;
  @ViewChild("content", { read: TemplateRef }) contentRef?: TemplateRef<any>;

  constructor(
    private tableService: TableService
  ) {
    this.tableConfig = this.tableService.getTableConfig();
    this.columnConfig = this.tableService.getColumnConfig();
    this.data$ = this.tableService.getData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderTable();
    }, 1000);
  }

  handleSelectionChangeEvent(event: any): void {
    console.log(event);
  }

  handleButtonClickEvent(event: any): void {
    console.log(event);
  }

  renderTable(): void {
    if (this.outletRef && this.contentRef) {
      this.outletRef.clear();
      this.outletRef.createEmbeddedView(this.contentRef);
    }
  }

}
