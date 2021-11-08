import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { DynamicFormControlAutocompleteOption } from "../models/dynamic-form-control-autocomplete-option";

export function autocompleteValidator(options: DynamicFormControlAutocompleteOption[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalid: boolean = !options
      .map((option: DynamicFormControlAutocompleteOption) => { return option.value; })
      .includes(control.value);

    return invalid ? { autocomplete: { value: control.value } } : null;
  };
}