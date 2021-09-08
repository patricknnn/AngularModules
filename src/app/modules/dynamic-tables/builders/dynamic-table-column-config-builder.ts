import { DynamicTableButton } from '../models/dynamic-table-button';
import { DynamicTableColumnConfig } from '../models/dynamic-table-column-config';

export class DynamicTableColumnConfigBuilder {
  public dynamicTableColumnConfig: DynamicTableColumnConfig;

  public constructor() {
    this.dynamicTableColumnConfig = new DynamicTableColumnConfig();
  }

  public setKey(value: string): this {
    this.dynamicTableColumnConfig.key = value;

    return this;
  }

  public setHeader(value: string): this {
    this.dynamicTableColumnConfig.header = value;

    return this;
  }

  public setType(value: string): this {
    this.dynamicTableColumnConfig.type = value;

    return this;
  }

  public setFooter(value: string): this {
    this.dynamicTableColumnConfig.footer = value;

    return this;
  }

  public setSticky(value: 'start' | 'end' | 'false'): this {
    this.dynamicTableColumnConfig.sticky = value;

    return this;
  }

  public setSortable(value: boolean): this {
    this.dynamicTableColumnConfig.sortable = value;

    return this;
  }

  public addButton(value: DynamicTableButton): this {
    this.dynamicTableColumnConfig.buttons.push(value);

    return this;
  }

  public setButtons(value: DynamicTableButton[]): this {
    this.dynamicTableColumnConfig.buttons = value;

    return this;
  }

  public build(): DynamicTableColumnConfig {
    const config: DynamicTableColumnConfig = this.dynamicTableColumnConfig;
    this.reset();

    return config;
  }

  private reset(): void {
    this.dynamicTableColumnConfig = new DynamicTableColumnConfig();
  }
}
