import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTableComponent } from './dynamic-table.component';
import { DynamicTableColumnConfig } from './models/dynamic-table-column-config';
import { DynamicTableConfig } from './models/dynamic-table-config';

describe('DynamicTableComponent', () => {
  const tableConfig: DynamicTableConfig = new DynamicTableConfig();
  const columnConfig: DynamicTableColumnConfig[] = [
    new DynamicTableColumnConfig(),
  ];
  const tableData: any[] = [];
  let component: DynamicTableComponent;
  let fixture: ComponentFixture<DynamicTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;
    component.tableConfig = tableConfig;
    component.columnConfig = columnConfig;
    component.data = tableData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
