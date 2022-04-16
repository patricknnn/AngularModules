import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { DynamicFormControlAutocompleteOption } from '../models/dynamic-form-control-autocomplete-option';

export function autocompleteValidator(options: DynamicFormControlAutocompleteOption[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalid: boolean = !options.includes(control.value);
    
    return invalid ? { autocomplete: { value: control.value } } : null;
  };
}