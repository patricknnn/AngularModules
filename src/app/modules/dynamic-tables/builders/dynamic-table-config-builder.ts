import { MatColor } from 'src/app/enums/material/mat-color';
import { MatFormAppearance } from 'src/app/enums/material/mat-form-appearance';
import { DynamicTableConfig } from '../models/dynamic-table-config';

export class DynamicTableConfigBuilder {
  private dynamicTableConfig: DynamicTableConfig;

  public constructor() {
    this.dynamicTableConfig = new DynamicTableConfig();
  }

  public setFilter(value: boolean): this {
    this.dynamicTableConfig.filter = value;

    return this;
  }

  public setFilterLabel(value: string): this {
    this.dynamicTableConfig.filterLabel = value;

    return this;
  }

  public setFilterPlaceholder(value: string): this {
    this.dynamicTableConfig.filterPlaceholder = value;

    return this;
  }

  public setFilterAppearance(
    value: MatFormAppearance,
  ): this {
    this.dynamicTableConfig.filterAppearance = value;

    return this;
  }

  public setFilterColor(value: MatColor): this {
    this.dynamicTableConfig.filterColor = value;

    return this;
  }

  public setPaging(value: boolean): this {
    this.dynamicTableConfig.paging = value;

    return this;
  }

  public setPagingSizeOptions(value: number[]): this {
    this.dynamicTableConfig.pagingSizeOptions = value;

    return this;
  }

  public setPagingSizeDefault(value: number): this {
    this.dynamicTableConfig.pagingSizeDefault = value;

    return this;
  }

  public setSorting(value: boolean): this {
    this.dynamicTableConfig.sorting = value;

    return this;
  }

  public setSortingActiveField(value: string): this {
    this.dynamicTableConfig.sortingActiveField = value;

    return this;
  }

  public setSortingActiveDirection(value: 'asc' | 'desc'): this {
    this.dynamicTableConfig.sortingActiveDirection = value;

    return this;
  }

  public setSelecting(value: boolean): this {
    this.dynamicTableConfig.selecting = value;

    return this;
  }

  public setSelectingSticky(value: 'start' | 'end' | 'false'): this {
    this.dynamicTableConfig.selectingSticky = value;

    return this;
  }

  public setStickyHeaders(value: boolean): this {
    this.dynamicTableConfig.stickyHeaders = value;

    return this;
  }

  public setStickyFooters(value: boolean): this {
    this.dynamicTableConfig.stickyFooters = value;

    return this;
  }

  public setTableClass(value: string): this {
    this.dynamicTableConfig.tableClass = value;

    return this;
  }

  public setScrollX(value: string): this {
    this.dynamicTableConfig.scrollX = value;

    return this;
  }

  public setScrollY(value: string): this {
    this.dynamicTableConfig.scrollY = value;

    return this;
  }

  public build(): DynamicTableConfig {
    const dynamicTableConfig: DynamicTableConfig = this.dynamicTableConfig;
    this.reset();

    return dynamicTableConfig;
  }

  private reset(): void {
    this.dynamicTableConfig = new DynamicTableConfig();
  }
}
