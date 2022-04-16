import { ValidatorFn, Validators } from '@angular/forms';
import { FormControlInputType } from '../enums/form-control-input-type';
import { FormControlType } from '../enums/form-control-type';
import { DynamicFormControl } from '../models/dynamic-form-control';
import { DynamicFormControlAutocompleteOption } from '../models/dynamic-form-control-autocomplete-option';
import { DynamicFormControlOption } from '../models/dynamic-form-control-option';
import { DynamicFormControlBuilder } from './dynamic-form-control-builder';

describe('DynamicFormControlBuilder', () => {
  const builder: DynamicFormControlBuilder<string> =
    new DynamicFormControlBuilder<string>();
  const fakeValue: string = 'fakeValue';
  const fakeKey: string = 'fakeKey';
  const fakeInputType: FormControlInputType = FormControlInputType.TEXT;
  const fakeControlType: FormControlType = FormControlType.AUTOCOMPLETE;
  const fakeOrder: number = 1;
  const fakePlaceholder: string = 'fakePlaceholder';
  const fakeLabel: string = 'fakeLabel';
  const fakeLabelPosition: 'before' | 'after' = 'before';
  const fakeFloatLabel: 'auto' | 'always' | 'never' = 'auto';
  const fakeCssClass: string = 'fakeCssClass';
  const fakeRemovable: boolean = true;
  const fakeAddOnBlur: boolean = false;
  const fakeOption: DynamicFormControlOption = {
    label: 'fakeOptions',
    value: 'fakeOptions',
  };
  const fakeAutocompleteOption: DynamicFormControlAutocompleteOption = {
    label: 'fakeOptions',
    value: 'fakeOptions',
    image: 'fakeOptions',
  };
  const fakeAge: number = 16;
  const fakeValidators: ValidatorFn[] = [Validators.required];

  let formControl: DynamicFormControl<string>;

  beforeEach(() => {
    formControl = builder
      .setValue(fakeValue)
      .setKey(fakeKey)
      .setInputType(fakeInputType)
      .setControlType(fakeControlType)
      .setOrder(fakeOrder)
      .setPlaceholder(fakePlaceholder)
      .setLabel(fakeLabel)
      .setLabelPosition(fakeLabelPosition)
      .setFloatLabel(fakeFloatLabel)
      .setCssClass(fakeCssClass)
      .setRemovable(fakeRemovable)
      .setAddOnBlur(fakeAddOnBlur)
      .setOptions([fakeOption])
      .setAutocompleteOptions([fakeAutocompleteOption])
      .setMinAge(fakeAge)
      .setValidators(fakeValidators)
      .build();
  });

  it('should create', () => {
    expect(builder).toBeTruthy();
  });

  it('should build DynamicFormControl', () => {
    expect(formControl).toBeTruthy();
  });

  it('should reset DynamicFormControl', () => {
    formControl = builder.build();

    expect(formControl.key).toBe('');
  });

  it('should build DynamicFormControl with correct value', () => {
    expect(formControl.value).toBe(fakeValue);
  });

  it('should build DynamicFormControl with correct key', () => {
    expect(formControl.key).toBe(fakeKey);
  });

  it('should build DynamicFormControl with correct type', () => {
    expect(formControl.inputType).toBe(fakeInputType);
  });

  it('should build DynamicFormControl with correct control type', () => {
    expect(formControl.controlType).toBe(fakeControlType);
  });

  it('should build DynamicFormControl with correct order', () => {
    expect(formControl.order).toBe(fakeOrder);
  });

  it('should build DynamicFormControl with correct placeholder', () => {
    expect(formControl.placeholder).toBe(fakePlaceholder);
  });

  it('should build DynamicFormControl with correct label', () => {
    expect(formControl.label).toBe(fakeLabel);
  });

  it('should build DynamicFormControl with correct labelposition', () => {
    expect(formControl.labelPosition).toBe(fakeLabelPosition);
  });

  it('should build DynamicFormControl with correct placeholder', () => {
    expect(formControl.placeholder).toBe(fakePlaceholder);
  });

  it('should build DynamicFormControl with correct floatlabel', () => {
    expect(formControl.floatLabel).toBe(fakeFloatLabel);
  });

  it('should build DynamicFormControl with correct css class', () => {
    expect(formControl.cssClass).toBe(fakeCssClass);
  });

  it('should build DynamicFormControl with correct removable', () => {
    expect(formControl.removable).toEqual(fakeRemovable);
  });

  it('should build DynamicFormControl with correct add on blur', () => {
    expect(formControl.addOnBlur).toEqual(fakeAddOnBlur);
  });

  it('should build DynamicFormControl with correct option', () => {
    expect(formControl.options).toContain(fakeOption);
  });

  it('should build DynamicFormControl with correct autocompleteOption', () => {
    expect(formControl.autocompleteOptions).toContain(fakeAutocompleteOption);
  });

  it('should build DynamicFormControl with correct validator', () => {
    expect(formControl.validators).toContain(Validators.required);
  });

  it('should build DynamicFormControl with correct minAge', () => {
    expect(formControl.minAge).toEqual(fakeAge);
  });
});
