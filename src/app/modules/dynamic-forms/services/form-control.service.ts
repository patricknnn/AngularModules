import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormControlType } from '../enums/form-control-type';
import { DynamicFormControl } from '../models/dynamic-form-control';
import { DynamicFormControlOption } from '../models/dynamic-form-control-option';

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

    if (formControl.controlType == FormControlType.TEXT && formControl.options.length) {
      validators.push(this.autocompleteValidator(formControl.options));
    }

    return validators;
  }

  private autocompleteValidator(options: DynamicFormControlOption[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalid: boolean = !options
        .map((option: DynamicFormControlOption) => { return option.value; })
        .includes(control.value);

      return invalid ? { autocomplete: { value: control.value } } : null;
    };
  }
}
