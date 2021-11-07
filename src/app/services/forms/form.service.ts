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
      new DynamicFormControlBuilder<boolean>()
        .setControlType('dropdown')
        .setKey('bool')
        .setLabel('Form')
        .setOptions([
          {
            label: 'Basic',
            value: false,
          },
          {
            label: 'Extended',
            value: true,
          },
        ])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('name')
        .setLabel('name')
        .setOptions([
          {
            value: 'Hydrogen',
            label: 'Hydrogen',
            image: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/youtube_logo_icon_168737.png'
          },
          {
            value: 'Helium',
            label: 'Helium'
          },
          {
            value: 'Lithium',
            label: 'Lithium'
          },
          {
            value: 'Beryllium',
            label: 'Beryllium'
          },
          {
            value: 'Boron',
            label: 'Boron'
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
    ];

    return formControls.sort(
      (a: DynamicFormControl<any>, b: DynamicFormControl<any>) =>
        a.order - b.order
    );
  }

  public getFormControlsExtra(): DynamicFormControl<any>[] {
    const formControls: DynamicFormControl<any>[] = [
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
