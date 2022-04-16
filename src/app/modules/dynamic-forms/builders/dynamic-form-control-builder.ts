import { ValidatorFn } from '@angular/forms';
import { DynamicFormControl } from '../models/dynamic-form-control';
import { DynamicFormControlAutocompleteOption } from '../models/dynamic-form-control-autocomplete-option';
import { DynamicFormControlOption } from '../models/dynamic-form-control-option';
import { FormControlType } from '../models/dynamic-form-control-type';
import { FormControlInputType } from '../models/dynamic-form-input-type';

export class DynamicFormControlBuilder<T> {
  private dynamicFormControl!: DynamicFormControl<T>;

  public constructor() {
    this.reset();
  }

  public setValue(value: T | undefined): this {
    this.dynamicFormControl.value = value;

    return this;
  }

  public setKey(value: string): this {
    this.dynamicFormControl.key = value;

    return this;
  }

  public setInputType(value: FormControlInputType): this {
    this.dynamicFormControl.inputType = value;

    return this;
  }

  public setControlType(value: FormControlType): this {
    this.dynamicFormControl.controlType = value;

    return this;
  }

  public setOrder(value: number): this {
    this.dynamicFormControl.order = value;

    return this;
  }

  public setPlaceholder(value: string): this {
    this.dynamicFormControl.placeholder = value;

    return this;
  }

  public setLabel(value: string): this {
    this.dynamicFormControl.label = value;

    return this;
  }

  public setLabelPosition(value: 'before' | 'after'): this {
    this.dynamicFormControl.labelPosition = value;

    return this;
  }

  public setFloatLabel(value: 'auto' | 'always' | 'never'): this {
    this.dynamicFormControl.floatLabel = value;

    return this;
  }

  public setCssClass(value: string): this {
    this.dynamicFormControl.cssClass = value;

    return this;
  }

  public setIndeterminate(value: boolean): this {
    this.dynamicFormControl.indeterminate = value;

    return this;
  }

  public setSelectable(value: boolean): this {
    this.dynamicFormControl.selectable = value;

    return this;
  }

  public setRemovable(value: boolean): this {
    this.dynamicFormControl.removable = value;

    return this;
  }

  public setAddOnBlur(value: boolean): this {
    this.dynamicFormControl.addOnBlur = value;

    return this;
  }

  public setOptions(value: DynamicFormControlOption[]): this {
    this.dynamicFormControl.options = value;

    return this;
  }

  public setAutocompleteOptions(value: DynamicFormControlAutocompleteOption[]): this {
    this.dynamicFormControl.autocompleteOptions = value;

    return this;
  }

  public setMinAge(value: number): this {
    this.dynamicFormControl.minAge = value;

    return this;
  }

  public setValidators(value: ValidatorFn[]): this {
    this.dynamicFormControl.validators = value;

    return this;
  }

  public build(): DynamicFormControl<T> {
    const dynamicFormControl: DynamicFormControl<T> = this.dynamicFormControl;
    this.reset();

    return dynamicFormControl;
  }

  private reset(): void {
    this.dynamicFormControl = new DynamicFormControl<T>();
  }
}
