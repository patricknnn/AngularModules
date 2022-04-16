import { FormControl, ValidatorFn } from '@angular/forms';
import { DynamicFormControlAutocompleteOption } from '../models/dynamic-form-control-autocomplete-option';
import { autocompleteValidator } from './autocomplete-validator';

const autocompleteOptions: DynamicFormControlAutocompleteOption[] = [{
  value: 'test',
  label: 'test',
}];
const validator: ValidatorFn = autocompleteValidator(autocompleteOptions);
const formControl: FormControl = new FormControl(validator);

describe('autocompleteValidator', () => {
  it('should return a validatorFn', () => {
    expect(validator).toBeDefined();
  });

  it('should set a validation error', () => {
    formControl.setValue('test');

    expect(validator(formControl)).toBeDefined();
  });

  it('should not set a validation error', () => {
    formControl.setValue(autocompleteOptions[0]);

    expect(validator(formControl)).toBeNull();
  });
});
