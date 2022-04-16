import { FormControl, ValidatorFn } from '@angular/forms';
import { minAgeValidator } from './min-age-validator';

const fakeAge: number = 16;
const validator: ValidatorFn = minAgeValidator(fakeAge);
const formControl: FormControl = new FormControl(validator);

describe('minAgeValidator', () => {
  it('should return a validatorFn', () => {
    expect(validator).toBeDefined();
  });

  it('should set a validation error', () => {
    formControl.setValue(new Date());

    expect(validator(formControl)).toBeDefined();
  });

  it('should not set a validation error', () => {
    const date: Date = new Date();
    date.setFullYear(new Date().getFullYear() - fakeAge);
    formControl.setValue(date);

    expect(validator(formControl)).toBeNull();
  });
});