import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormControl } from '../models/dynamic-form-control';

@Injectable()
export class FormControlService {
  public toFormGroup(formControls: DynamicFormControl<any>[]): FormGroup {
    const group: any = {};
    formControls.forEach((formControl: DynamicFormControl<any>) => {
      group[formControl.key] = new FormControl(
        { value: formControl.value || '', disabled: formControl.disabled },
        formControl.validators
      );
    });
    return new FormGroup(group);
  }
}
