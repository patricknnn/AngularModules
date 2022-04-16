import { ValidatorFn } from '@angular/forms';
import { DynamicFormControlAutocompleteOption } from './dynamic-form-control-autocomplete-option';
import { DynamicFormControlOption } from './dynamic-form-control-option';
import { FormControlType } from './dynamic-form-control-type';
import { FormControlInputType } from './dynamic-form-input-type';

export class DynamicFormControl<T> {
  public constructor(
    public value: T | undefined = undefined,
    public key: string = '',
    public inputType: FormControlInputType = 'text',
    public controlType: FormControlType = 'text',
    public order: number = 1,
    public placeholder: string = '',
    public label: string = '',
    public labelPosition: 'before' | 'after' = 'before',
    public floatLabel: 'auto' | 'always' | 'never' = 'auto',
    public cssClass: string = '',
    public indeterminate: boolean = false,
    public selectable: boolean = true,
    public removable: boolean = true,
    public addOnBlur: boolean = true,
    public disabled: boolean = false,
    public minAge: number = 0,
    public options: DynamicFormControlOption[] = [],
    public autocompleteOptions: DynamicFormControlAutocompleteOption[] = [],
    public validators: ValidatorFn[] = [],
  ) {}
}
