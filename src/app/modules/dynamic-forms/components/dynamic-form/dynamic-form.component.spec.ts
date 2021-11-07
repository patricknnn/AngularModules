import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { DynamicFormControlBuilder } from '../../builders/dynamic-form-control-builder';
import { FormControlType } from '../../enums/form-control-type';
import { DynamicFormControl } from '../../models/dynamic-form-control';
import { DynamicFormControlValueChange } from '../../models/dynamic-form-control-value-change';
import { FormControlService } from '../../services/form-control.service';
import { DynamicFormComponent } from './dynamic-form.component';

const formControlKey: string = 'key';
const formControlKeyNested: string = 'nested.value.key';
const formControlInitialValue: string = 'initial';
const formControlUpdatedValue: string = 'updated';
const formControlValueChangeSimple: DynamicFormControlValueChange = {
  key: formControlKey,
  value: formControlUpdatedValue,
};
const formControlValueChangeNested: DynamicFormControlValueChange = {
  key: formControlKeyNested,
  value: formControlUpdatedValue,
};
const formModel: any = {
  key: formControlInitialValue,
  nested: {
    value: {
      key: formControlInitialValue,
    },
  },
};
const formControls: DynamicFormControl<any>[] = [
  new DynamicFormControlBuilder<string>()
    .setKey(formControlKey)
    .setControlType(FormControlType.TEXT)
    .setLabel('simple')
    .setOrder(1)
    .build(),
  new DynamicFormControlBuilder<string>()
    .setKey(formControlKeyNested)
    .setControlType(FormControlType.TEXT)
    .setLabel('nested')
    .setOrder(2)
    .build(),
];

let component: DynamicFormComponent;
let fixture: ComponentFixture<DynamicFormComponent>;

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(DynamicFormComponent);
  component = fixture.componentInstance;
  component.formModel = formModel;
  component.formControls = formControls;
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

describe('The DynamicFormComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DynamicFormComponent],
      providers: [
        { provide: FormControlService, useClass: FormControlService },
      ],
    }).compileComponents();

    await createComponent();
  });

  it('contains the expected amount of formcontrols', () => {
    component.buildForm();

    expect(Object.keys(component.form.controls).length).toEqual(formControls.length);
  });

  it('displays the expected initial values for simple object', () => {
    component.formModel.key = formControlInitialValue;
    component.buildForm();

    expect(component.form.controls[formControlKey].value).toEqual(formControlInitialValue);
  });

  it('updates the expected model values for simple object', () => {
    component.handleControlValueChange(formControlValueChangeSimple);

    expect(component.formModel.key).toEqual(formControlUpdatedValue);
  });

  it('displays the expected initial values for nested object', () => {
    component.formModel.nested.value.key = formControlInitialValue;
    component.buildForm();

    expect(component.form.controls[formControlKeyNested].value).toEqual(formControlInitialValue);
  });

  it('updates the expected model values for nested object', () => {
    component.handleControlValueChange(formControlValueChangeNested);

    expect(component.formModel.nested.value.key).toEqual(formControlUpdatedValue);
  });

  it('should mark form as tocuhed', () => {
    component.form = new FormGroup({});
    
    component.markFormAsTouched();

    expect(component.form.touched).toEqual(true);
  });
});
