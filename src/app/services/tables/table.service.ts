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
      this._columnConfigBuilder
        .setKey('position')
        .setHeader('position')
        .build(),
      this._columnConfigBuilder.setKey('name').setHeader('name').build(),
      this._columnConfigBuilder.setKey('weight').setHeader('weight').build(),
      this._columnConfigBuilder.setKey('symbol').setHeader('symbol').build(),
      this._columnConfigBuilder.setKey('nested.element').setHeader('nested').build(),
    ];
  }

  getTableData(): Observable<PeriodicElement[]> {
    const ELEMENT_DATA: PeriodicElement[] = [
      {
        position: 1,
        name: 'Hydrogen',
        weight: 1.0079,
        symbol: 'H',
        nested: {
          element: 'Nested Element',
        },
      },
      {
        position: 2,
        name: 'Helium',
        weight: 4.0026,
        symbol: 'He',
        nested: {
          element: 'Nested Element',
        },
      },
      {
        position: 3,
        name: 'Lithium',
        weight: 6.941,
        symbol: 'Li',
        nested: {
          element: 'Nested Element',
        },
      },
      {
        position: 4,
        name: 'Beryllium',
        weight: 9.0122,
        symbol: 'Be',
        nested: {
          element: 'Nested Element',
        },
      },
      {
        position: 5,
        name: 'Boron',
        weight: 10.811,
        symbol: 'B',
        nested: {
          element: 'Nested Element',
        },
      },
    ];
    return of(ELEMENT_DATA);
  }
}
