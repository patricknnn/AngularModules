import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormControlBuilder } from 'src/app/modules/dynamic-forms/builders/dynamic-form-control-builder';
import { FormControlType } from 'src/app/modules/dynamic-forms/enums/form-control-type';
import { DynamicFormControl } from 'src/app/modules/dynamic-forms/models/dynamic-form-control';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public create(): DynamicFormControl<any>[] {
    return [
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.TEXT)
        .setKey('name')
        .setLabel('Name')
        .setValidators([Validators.required])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.DATE)
        .setKey('date')
        .setLabel('Date')
        .setValidators([Validators.required])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.DATE_OF_BIRTH)
        .setKey('dateOfBirth')
        .setLabel('Date of birth')
        .setMinAge(3)
        .setValidators([Validators.required])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.DATE_RANGE)
        .setKey('dateRange')
        .setLabel('Date range')
        .setValidators([Validators.required])
        .build(),
    ];
  }

  getModel(): any {
    return {
      name: '',
      date: '',
      dateOfBirth: '',
      dateRange: {
        start: '',
        end: '',
      },
    };
  }
}
