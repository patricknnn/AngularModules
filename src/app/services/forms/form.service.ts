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
        .setLabel('Name')
        .setValue('Bennie')
        .setOrder(1)
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('street')
        .setLabel('Street')
        .setValue('Zuidenveld')
        .setOrder(2)
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('postalCode')
        .setLabel('Postal Code')
        .setValue('9642 GK')
        .setOrder(3)
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('city')
        .setLabel('City')
        .setValue('Veendam')
        .setOrder(4)
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('country')
        .setLabel('Country')
        .setValue('Netherlands')
        .setOrder(5)
        .build(),
    ];

    return formControls.sort(
      (a: DynamicFormControl<any>, b: DynamicFormControl<any>) =>
        a.order - b.order
    );
  }

  getElement(): PeriodicElement {
    return new PeriodicElement(1, 'Hydrogen', 1.0079, 'H');
  }
}
