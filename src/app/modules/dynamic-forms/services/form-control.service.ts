import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { FormControlType } from '../enums/form-control-type';
import { DynamicFormControl } from '../models/dynamic-form-control';
import { autocompleteValidator } from '../validators/autocomplete-validator';

@Injectable()
export class FormControlService {
  public toFormGroup(formControls: DynamicFormControl<any>[]): FormGroup {
    const group: any = {};
    formControls.forEach((formControl: DynamicFormControl<any>) => {
      group[formControl.key] = new FormControl(
        { value: formControl.value || '', disabled: formControl.disabled },
        this.getValidators(formControl),
      );
    });
    return new FormGroup(group);
  }

  private getValidators(formControl: DynamicFormControl<any>): ValidatorFn[] {
    const validators: ValidatorFn[] = formControl.validators;

    if (formControl.controlType == FormControlType.TEXT && formControl.autocompleteOptions.length) {
      validators.push(autocompleteValidator(formControl.autocompleteOptions));
    }

    return validators;
  }
}
