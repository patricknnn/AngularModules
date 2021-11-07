import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicTableColumnConfigBuilder } from './builders/dynamic-table-column-config-builder';
import { DynamicTableComponent } from './dynamic-table.component';
import { DynamicTableColumnConfig } from './models/dynamic-table-column-config';
import { DynamicTableConfig } from './models/dynamic-table-config';

const testString: string = 'test';
const tableConfig: DynamicTableConfig = new DynamicTableConfig();
const columnConfig: DynamicTableColumnConfig[] = [new DynamicTableColumnConfigBuilder().setKey(testString).build()];
const tableData: any[] = [{ test: testString }];

let component: DynamicTableComponent;
let fixture: ComponentFixture<DynamicTableComponent>;

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(DynamicTableComponent);
  component = fixture.componentInstance;
  component.tableConfig = tableConfig;
  component.columnConfig = columnConfig;
  component.data = tableData;
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

describe('The DynamicTableComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DynamicTableComponent],
    }).compileComponents();

    await createComponent();
  });

  it('should init table columns without selecting', () => {
    component.displayColumns = [];
    component.tableConfig.selecting = false;

    component.initTableColumns();

    expect(component.displayColumns).not.toContain('selectRowColumn');
  });

  it('should init table columns with selecting', () => {
    component.displayColumns = [];
    component.tableConfig.selecting = true;

    component.initTableColumns();

    expect(component.displayColumns).toContain('selectRowColumn');
  });

  it('should apply text filter', () => {
    component.activeTextFilter = testString;

    component.applyTextFilter();

    expect(component.dataSource.filter).toBe(testString);
  });

  it('should reset text filter', () => {
    component.resetTextFilter();

    expect(component.dataSource.filter).toBe('');
  });

  it('should apply dropdown filter', () => {
    component.applyDropdownFilter(testString, testString);

    expect(component.activeDropdownFilters[testString]).toBe(testString);
  });

  it('should reset dropdown filter', () => {
    component.resetDropdownFilters();

    expect(component.activeDropdownFilters).toEqual({});
    expect(component.filteredData).toBe(component.data);
  });

  it('should detect empty dropdown filters', () => {
    component.columnConfig[0].filterable = false;

    expect(component.areDropdownFiltersEmpty()).toBe(true);
  });

  it('should detect not empty dropdown filters', () => {
    component.columnConfig[0].filterable = true;

    expect(component.areDropdownFiltersEmpty()).toBe(false);
  });

  it('should toggle dropdown filter expanded', () => {
    component.areDropdownFiltersExpanded = false;

    component.toggleDropdownFilters();

    expect(component.areDropdownFiltersExpanded).toBe(true);
  });

  it('should return DropdownFilterOptions', () => {
    expect(component.getDropdownFilterOptions(testString)).toEqual([testString]);
  });

  it('should return cell content', () => {
    expect(component.getCellContent(component.data[0], testString)).toBe(testString);
  });

  it('should detect empty footer', () => {
    component.columnConfig[0].footer = '';

    expect(component.isFooterEmpty()).toBe(true);
  });

  it('should detect not empty footer', () => {
    component.columnConfig[0].footer = testString;

    expect(component.isFooterEmpty()).toBe(false);
  });

  it('should toggle selected row', () => {
    component.selection.clear();

    component.toggleSelectedRow(component.data[0]);

    expect(component.selection.isSelected(component.data[0])).toBe(true);
  });

  it('should toggle all selected rows', () => {
    component.selection.clear();

    component.toggleSelectAllRows();

    expect(component.selection.hasValue()).toBe(true);
  });

  it('should detect all rows selected', () => {
    component.selection.clear();
    
    component.toggleSelectAllRows();

    expect(component.areAllRowsSelected()).toBe(true);
  });


  it('should create datasource', () => {
    component.ngAfterViewInit();

    expect(component.dataSource).toBeDefined();
  });

});
