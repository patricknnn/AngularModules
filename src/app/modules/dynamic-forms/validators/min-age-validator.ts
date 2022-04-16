import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const minDate: Date = new Date();
    minDate.setFullYear(new Date().getFullYear() - minAge);

    if (control.value !== null) {
      return isNaN(control.value) || new Date(control.value) > minDate
        ? { minAge: true }
        : null;
    }

    return null;
  };
}