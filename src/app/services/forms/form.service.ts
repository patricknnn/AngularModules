import { Injectable } from '@angular/core';
import { PeriodicElement } from 'src/app/models/periodic-element';
import { DynamicFormControlBuilder } from 'src/app/modules/dynamic-forms/builders/dynamic-form-control-builder';
import { DynamicFormControl } from 'src/app/modules/dynamic-forms/models/dynamic-form-control';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public getFormControls(): DynamicFormControl<any>[] {
    const formControls: DynamicFormControl<any>[] = [
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('name')
        .setLabel('name')
        .setOrder(1)
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('symbol')
        .setLabel('symbol')
        .setOrder(2)
        .build(),
      new DynamicFormControlBuilder<number>()
        .setControlType('text')
        .setKey('weight')
        .setLabel('weight')
        .setOrder(3)
        .build(),
      new DynamicFormControlBuilder<number>()
        .setControlType('text')
        .setKey('position')
        .setLabel('position')
        .setOrder(4)
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('nested.element')
        .setLabel('Nested')
        .setOrder(5)
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('nested.deep.element')
        .setLabel('Nested deep')
        .setOrder(5)
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
      nested: {
        element: 'Nested Element',
        deep: {
          element: 'Nested deep',
        },
      },
    };
  }
}
