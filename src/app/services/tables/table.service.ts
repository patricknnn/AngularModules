import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PeriodicElement } from 'src/app/models/periodic-element';
import { DynamicTableColumnConfigBuilder } from 'src/app/modules/dynamic-tables/builders/dynamic-table-column-config-builder';
import { DynamicTableConfigBuilder } from 'src/app/modules/dynamic-tables/builders/dynamic-table-config-builder';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private readonly _columnConfigBuilder: DynamicTableColumnConfigBuilder =
    new DynamicTableColumnConfigBuilder();

  getTableConfig(): DynamicTableConfig {
    return new DynamicTableConfigBuilder()
      .setFilter(true)
      .setFilterLabel('Zoeken')
      .setPaging(true)
      .setSorting(true)
      .build();
  }

  getColumnConfig(): DynamicTableColumnConfig[] {
    return [
      this._columnConfigBuilder.setKey('position').setHeader('position').build(),
      this._columnConfigBuilder.setKey('name').setHeader('name').build(),
      this._columnConfigBuilder.setKey('weight').setHeader('weight').build(),
      this._columnConfigBuilder.setKey('symbol').setHeader('symbol').build(),
    ];
  }

  getTableData(): Observable<PeriodicElement[]> {
    const ELEMENT_DATA: PeriodicElement[] = [
      new PeriodicElement(1, 'Hydrogen', 1.0079, 'H'),
      new PeriodicElement(2, 'Helium', 4.0026, 'He'),
      new PeriodicElement(3, 'Lithium', 6.941, 'Li'),
      new PeriodicElement(4, 'Beryllium', 9.0122, 'Be'),
      new PeriodicElement(5, 'Boron', 10.811, 'B'),
    ];
    return of(ELEMENT_DATA);
  }
}
