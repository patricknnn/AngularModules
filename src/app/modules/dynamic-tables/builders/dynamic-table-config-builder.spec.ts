
import { MatColor, MatFormAppearance } from '@aic/core-ui/src/lib/enums';
import { DynamicTableConfig } from '../models/dynamic-table-config';
import { DynamicTableConfigBuilder } from './dynamic-table-config-builder';

describe('DynamicTableConfigBuilder', () => {
  const builder: DynamicTableConfigBuilder = new DynamicTableConfigBuilder();
  const fakeString: string = 'fakeValue';
  const fakeBoolean: boolean = true;
  const fakeNumber: number = 10;
  const fakeAppearance: MatFormAppearance = MatFormAppearance.STANDARD;
  const fakeColor: MatColor = MatColor.WARN;
  const fakeSticky: 'start' | 'end' | 'false' = 'start';
  const fakeDirection: 'asc' | 'desc' = 'desc';

  let tableConfig: DynamicTableConfig;

  beforeEach(() => {
    tableConfig = builder
      .setFilter(fakeBoolean)
      .setFilterAppearance(fakeAppearance)
      .setFilterColor(fakeColor)
      .setFilterLabel(fakeString)
      .setFilterPlaceholder(fakeString)
      .setPaging(fakeBoolean)
      .setPagingSizeDefault(fakeNumber)
      .setPagingSizeOptions([fakeNumber])
      .setScrollX(fakeString)
      .setScrollY(fakeString)
      .setSelecting(fakeBoolean)
      .setSelectingSticky(fakeSticky)
      .setSorting(fakeBoolean)
      .setSortingActiveDirection(fakeDirection)
      .setSortingActiveField(fakeString)
      .setStickyFooters(fakeBoolean)
      .setStickyHeaders(fakeBoolean)
      .setTableClass(fakeString)
      .build();
  });

  it('should create', () => {
    expect(builder).toBeTruthy();
  });

  it('should build', () => {
    expect(tableConfig).toBeTruthy();
  });

  it('should reset', () => {
    tableConfig = builder.build();

    expect(tableConfig.filterLabel).toBe('Search');
  });

  it('should set filter', () => {
    expect(tableConfig.filter).toBe(fakeBoolean);
  });

  it('should set filter appearance', () => {
    expect(tableConfig.filterAppearance).toBe(fakeAppearance);
  });

  it('should setFilterColor', () => {
    expect(tableConfig.filterColor).toBe(fakeColor);
  });

  it('should setFilterLabel', () => {
    expect(tableConfig.filterLabel).toBe(fakeString);
  });

  it('should setFilterPlaceholder', () => {
    expect(tableConfig.filterPlaceholder).toBe(fakeString);
  });

  it('should setPaging', () => {
    expect(tableConfig.paging).toBe(fakeBoolean);
  });

  it('should setPagingSizeDefault', () => {
    expect(tableConfig.pagingSizeDefault).toBe(fakeNumber);
  });

  it('should setPagingSizeOptions', () => {
    expect(tableConfig.pagingSizeOptions).toEqual([fakeNumber]);
  });

  it('should setScrollX', () => {
    expect(tableConfig.scrollX).toBe(fakeString);
  });

  it('should setScrollY', () => {
    expect(tableConfig.scrollY).toBe(fakeString);
  });

  it('should setSelecting', () => {
    expect(tableConfig.selecting).toBe(fakeBoolean);
  });

  it('should setSelectingSticky', () => {
    expect(tableConfig.selectingSticky).toBe(fakeSticky);
  });

  it('should setSorting', () => {
    expect(tableConfig.sorting).toBe(fakeBoolean);
  });

  it('should setSortingActiveDirection', () => {
    expect(tableConfig.sortingActiveDirection).toBe(fakeDirection);
  });

  it('should setSortingActiveField', () => {
    expect(tableConfig.sortingActiveField).toBe(fakeString);
  });

  it('should setStickyFooters', () => {
    expect(tableConfig.stickyFooters).toBe(fakeBoolean);
  });

  it('should setStickyHeaders', () => {
    expect(tableConfig.stickyHeaders).toBe(fakeBoolean);
  });

  it('should setTableClass', () => {
    expect(tableConfig.tableClass).toBe(fakeString);
  });
});
