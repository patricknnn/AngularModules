import { DynamicTableButton } from '../models/dynamic-table-button';
import { DynamicTableColumnConfig } from '../models/dynamic-table-column-config';
import { DynamicTableColumnConfigBuilder } from './dynamic-table-column-config-builder';

describe('DynamicTableColumnConfigBuilder', () => {
  const builder: DynamicTableColumnConfigBuilder = new DynamicTableColumnConfigBuilder();
  const fakeString: string = 'fakeValue';
  const fakeBoolean: boolean = true;
  const fakeSticky: 'start' | 'end' | 'false' = 'start';
  const fakeButton: DynamicTableButton = {
    name: fakeSticky,
    icon: fakeString,
  };

  let columnConfig: DynamicTableColumnConfig;

  beforeEach(() => {
    columnConfig = builder
      .setButtons([fakeButton])
      .setFilterable(fakeBoolean)
      .setFooter(fakeString)
      .setHeader(fakeString)
      .setKey(fakeString)
      .setSortable(fakeBoolean)
      .setSticky(fakeSticky)
      .setType(fakeString)
      .build();
  });

  it('should create', () => {
    expect(builder).toBeTruthy();
  });

  it('should build', () => {
    expect(columnConfig).toBeTruthy();
  });

  it('should reset', () => {
    columnConfig = builder.build();

    expect(columnConfig.key).toBe('');
  });

  it('should set buttons', () => {
    expect(columnConfig.buttons).toEqual([fakeButton]);
  });

  it('should setFilterable', () => {
    expect(columnConfig.filterable).toBe(fakeBoolean);
  });

  it('should setFooter', () => {
    expect(columnConfig.footer).toBe(fakeString);
  });

  it('should setHeader', () => {
    expect(columnConfig.header).toBe(fakeString);
  });

  it('should setKey', () => {
    expect(columnConfig.key).toBe(fakeString);
  });

  it('should setSortable', () => {
    expect(columnConfig.sortable).toBe(fakeBoolean);
  });

  it('should setSticky', () => {
    expect(columnConfig.sticky).toBe(fakeSticky);
  });

  it('should setType', () => {
    expect(columnConfig.type).toEqual(fakeString);
  });
});
