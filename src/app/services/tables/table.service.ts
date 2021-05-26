import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DynamicTableButton } from 'src/app/modules/dynamic-tables/models/dynamic-table-button';
import { DynamicTableColumnConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-column-config';
import { DynamicTableConfig } from 'src/app/modules/dynamic-tables/models/dynamic-table-config';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  getTableConfig(): DynamicTableConfig {
    return new DynamicTableConfig({
      filter: true,
      pagination: true,
      selectRowColumn: true,
      expandableRows: true,
      buttonRowColumn: true,
      buttonRowColumnButtons: [
        new DynamicTableButton("edit", "edit"),
        new DynamicTableButton("delete", "delete", "warn"),
      ],
      activeSortField: "position",
      tableClass: "mat-elevation-z8"
    });
  }

  getColumnConfig(): DynamicTableColumnConfig[] {
    const columns: DynamicTableColumnConfig[] = [
      new DynamicTableColumnConfig({
        field: 'position',
        header: 'Position',
        sortable: true
      }),
      new DynamicTableColumnConfig({
        field: 'name',
        header: 'Name',
        sortable: true
      }),
      new DynamicTableColumnConfig({
        field: 'weight',
        header: 'Weight',
        sortable: true
      }),
      new DynamicTableColumnConfig({
        field: 'symbol',
        header: 'Symbol',
      }),
      new DynamicTableColumnConfig({
        field: 'text',
        header: 'Text',
        expandable: true,
      }),
    ];
    return columns;
  }

  getData(): Observable<any[]> {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu odio purus. Quisque augue lacus, vehicula quis vestibulum blandit, vestibulum ut ante. Ut venenatis metus sed ipsum malesuada feugiat. Nam et quam mollis, porttitor sem eu, auctor lacus. Morbi nec sem vulputate, consectetur ipsum vitae, fringilla risus. Fusce condimentum laoreet consequat. Vestibulum feugiat, mauris pellentesque cursus tempor, augue quam commodo neque, sit amet tristique diam massa nec purus. Maecenas malesuada pretium dui, vitae cursus mi tristique ac. Integer convallis lorem metus, eget aliquet nulla pretium ut. Donec mattis metus dui, sit amet luctus risus interdum nec";
    const ELEMENT_DATA: any[] = [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', text: text },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', text: text },
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', text: text },
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', text: text },
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', text: text },
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', text: text },
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', text: text },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', text: text },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', text: text },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', text: text },
      { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', text: text },
      { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', text: text },
      { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', text: text },
      { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', text: text },
      { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', text: text },
      { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', text: text },
      { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', text: text },
      { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', text: text },
      { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', text: text },
      { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', text: text },
    ];
    return of(ELEMENT_DATA)
  }
}

