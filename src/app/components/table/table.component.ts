import { AfterViewInit, Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodicElement } from 'src/app/models/periodic-element';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';
import { TableService } from 'src/app/services/tables/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  tableConfig: DynamicTableConfig;
  columnConfig: DynamicTableColumnConfig[];
  data$: Observable<PeriodicElement[]>;
  appearanceOptions = ['legacy', 'standard', 'fill', 'outline'];
  colorOptions = ['primary', 'accent', 'warn'];

  @ViewChild('outlet', { read: ViewContainerRef }) outletRef?: ViewContainerRef;
  @ViewChild('content', { read: TemplateRef }) contentRef?: TemplateRef<any>;

  constructor(private tableService: TableService) {
    this.tableConfig = this.tableService.getTableConfig();
    this.columnConfig = this.tableService.getColumnConfig();
    this.data$ = this.tableService.getTableData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderTable();
    });
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
