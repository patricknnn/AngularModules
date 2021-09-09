import { Injectable } from '@angular/core';
import { PeriodicElement } from 'src/app/models/periodic-element';
import { DynamicFormControlBuilder } from 'src/app/modules/dynamic-forms/builders/dynamic-form-control-builder';
import { DynamicFormControl } from 'src/app/modules/dynamic-forms/models/dynamic-form-control';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public getFormControls(element: PeriodicElement): DynamicFormControl<any>[] {
    const formControls: DynamicFormControl<any>[] = [
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('name')
        .setLabel('name')
        .setValue(element.name)
        .setOrder(1)
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType('text')
        .setKey('symbol')
        .setLabel('symbol')
        .setValue(element.symbol)
        .setOrder(2)
        .build(),
      new DynamicFormControlBuilder<number>()
        .setControlType('text')
        .setKey('weight')
        .setLabel('weight')
        .setValue(element.weight)
        .setOrder(3)
        .build(),
      new DynamicFormControlBuilder<number>()
        .setControlType('text')
        .setKey('position')
        .setLabel('position')
        .setValue(element.position)
        .setOrder(4)
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
