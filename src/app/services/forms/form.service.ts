import { Injectable } from '@angular/core';
import { PeriodicElement } from 'src/app/models/periodic-element';
import { DynamicFormControlBuilder } from 'src/app/modules/dynamic-forms/builders/dynamic-form-control-builder';
import { DynamicFormControl } from 'src/app/modules/dynamic-forms/models/dynamic-form-control';
import { DynamicFormControlAutocompleteOption } from 'src/app/modules/dynamic-forms/models/dynamic-form-control-autocomplete-option';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public getFormControls(
    countries: DynamicFormControlAutocompleteOption[]
  ): DynamicFormControl<any>[] {
    const formControls: DynamicFormControl<any>[] = [
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('country')
        .setLabel('country')
        .setAutocompleteOptions(countries)
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('name')
        .setLabel('name')
        .setAutocompleteOptions([
          {
            value: 'Hydrogen',
          },
          {
            value: 'Helium',
          },
          {
            value: 'Lithium',
          },
          {
            value: 'Beryllium',
          },
          {
            value: 'Boron',
          },
        ])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('symbol')
        .setLabel('symbol')
        .build(),
      new DynamicFormControlBuilder<number>()
        .setControlType('text')
        .setKey('weight')
        .setLabel('weight')
        .build(),
      new DynamicFormControlBuilder<number>()
        .setControlType('text')
        .setKey('position')
        .setLabel('position')
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('nested.element')
        .setLabel('Nested')
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('nested.deep.element')
        .setLabel('Nested deep')
        .build(),
    ];

    return formControls.sort(
      (a: DynamicFormControl<any>, b: DynamicFormControl<any>) =>
        a.order - b.order
    );
  }

  getElement(): PeriodicElement {
    return {
      position: 1,
      name: 'Hydrogen',
      weight: 1.0079,
      symbol: 'H',
      bool: false,
      nested: {
        element: 'Nested Element',
        deep: {
          element: 'Nested deep',
        },
      },
    };
  }
}
