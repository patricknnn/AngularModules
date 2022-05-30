import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PeriodicElement } from 'src/app/models/periodic-element';
import { DynamicTableColumnConfigBuilder } from 'src/app/modules/dynamic-tables/builders/dynamic-table-column-config-builder';
import { DynamicTableConfigBuilder } from 'src/app/modules/dynamic-tables/builders/dynamic-table-config-builder';
import { DynamicTableColumnType } from 'src/app/modules/dynamic-tables/enums/dynamic-table-column-type';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private readonly _columnConfigBuilder: DynamicTableColumnConfigBuilder = new DynamicTableColumnConfigBuilder();
  private date: string = '2022-05-27T07:13:31.631Z';
  private dateTwo: string = '2021-05-27T07:13:31.631Z';
  private dateThree: string = '2020-05-27T07:13:31.631Z';

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
      this._columnConfigBuilder
        .setKey('name')
        .setHeader('name')
        .setFilterable(true)
        .build(),
      this._columnConfigBuilder
        .setKey('weight')
        .setHeader('weight')
        .setFilterable(true)
        .build(),
      this._columnConfigBuilder
        .setKey('symbol')
        .setHeader('symbol')
        .setFilterable(true)
        .build(),
      this._columnConfigBuilder
        .setKey('nested.element')
        .setHeader('nested')
        .setType(DynamicTableColumnType.DATE)
        .build(),
    ];
  }

  getTableData(): Observable<PeriodicElement[]> {
    const ELEMENT_DATA: PeriodicElement[] = [
      {
        position: 1,
        name: 'Hydrogen',
        weight: 1.0079,
        symbol: 'H',
        bool: true,
        dateRange: {
          start: '',
          end: '',
        },
        nested: {
          element: this.date,
        },
      },
      {
        position: 2,
        name: 'Helium',
        weight: 4.0026,
        symbol: 'He',
        bool: true,
        dateRange: {
          start: '',
          end: '',
        },
        nested: {
          element: this.dateTwo,
        },
      },
      {
        position: 3,
        name: 'Lithium',
        weight: 6.941,
        symbol: 'Li',
        bool: true,
        dateRange: {
          start: '',
          end: '',
        },
        nested: {
          element: this.dateThree,
        },
      },
      {
        position: 4,
        name: 'Beryllium',
        weight: 9.0122,
        symbol: 'Be',
        bool: true,
        dateRange: {
          start: '',
          end: '',
        },
        nested: {
          element: this.date,
        },
      },
      {
        position: 5,
        name: 'Boron',
        weight: 10.811,
        symbol: 'B',
        bool: true,
        dateRange: {
          start: '',
          end: '',
        },
        nested: {
          element: this.date,
        },
      },
    ];

    return of(ELEMENT_DATA);
  }
}
