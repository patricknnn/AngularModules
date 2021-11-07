import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormControlBuilder } from '../../builders/dynamic-form-control-builder';
import { FormControlType } from '../../enums/form-control-type';
import { DynamicFormControl } from '../../models/dynamic-form-control';
import { FormControlService } from '../../services/form-control.service';
import { DynamicFormControlComponent } from './dynamic-form-control.component';

const dynamicFormControl: DynamicFormControl<any> = new DynamicFormControlBuilder<string>().build();
const formGroup: FormGroup = new FormControlService().toFormGroup([dynamicFormControl]);

let component: DynamicFormControlComponent;
let fixture: ComponentFixture<DynamicFormControlComponent>;

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(DynamicFormControlComponent);
  component = fixture.componentInstance;
  component.form = formGroup;
  component.control = dynamicFormControl;
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

describe('DynamicFormControlComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DynamicFormControlComponent],
      imports: [BrowserAnimationsModule],
    }).compileComponents();

    await createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('using isFormFieldControl()', () => {
    it('Should return "true" if control is a form field control', () => {
      component.control.controlType = FormControlType.TEXT;

      expect(component.isFormFieldControl).toEqual(true);
    });
    it('Should return "false" if control is not a form field control', () => {
      component.control.controlType = FormControlType.CHECKBOX;

      expect(component.isFormFieldControl).toEqual(false);
    });
  });

  describe('using isRequired()', () => {
    it('should return "true" if control is required', () => {
      component.control.validators = [Validators.required];

      expect(component.isRequired).toEqual(true);
    });

    it('should return "false" if control is not required', () => {
      component.control.validators = [];

      expect(component.isRequired).toEqual(false);
    });
  });

  describe('using isValid()', () => {
    it('should return "true" if control is valid', () => {
      component.form.controls[dynamicFormControl.key].setValue('test');

      expect(component.isValid).toEqual(true);
    });

    it('should return "false" if control is not valid', () => {
      component.form.controls[dynamicFormControl.key].setErrors({
        required: true,
      });

      expect(component.isValid).toEqual(false);
    });
  });

  describe('using isTouched()', () => {
    it('should return "true" if control is touched', () => {
      component.form.controls[dynamicFormControl.key].markAsTouched();

      expect(component.isTouched).toEqual(true);
    });

    it('should return "false" if control is not touched', () => {
      component.form.controls[dynamicFormControl.key].markAsUntouched();

      expect(component.isTouched).toEqual(false);
    });
  });

  describe('using errorMessage()', () => {
    it('should return message "required" if value is required', () => {
      component.form.controls[dynamicFormControl.key].setErrors({
        required: true,
      });

      expect(component.errorMessage).toContain('required');
    });

    it('should return message "requiredTrue" if value is required true', () => {
      component.form.controls[dynamicFormControl.key].setErrors({
        requiredtrue: true,
      });

      expect(component.errorMessage).toContain('required');
    });

    it('should return message "min" if value is too low', () => {
      component.form.controls[dynamicFormControl.key].setErrors({ min: true });

      expect(component.errorMessage).toContain('too low');
    });

    it('should return message "max" if value is too high', () => {
      component.form.controls[dynamicFormControl.key].setErrors({ max: true });

      expect(component.errorMessage).toContain('too high');
    });

    it('should return message "email" if value is not a valid email', () => {
      component.form.controls[dynamicFormControl.key].setErrors({
        email: true,
      });

      expect(component.errorMessage).toContain('not a valid email');
    });

    it('should return message "minlength" if value is too short', () => {
      component.form.controls[dynamicFormControl.key].setErrors({
        minlength: true,
      });

      expect(component.errorMessage).toContain('not have enough characters');
    });

    it('should return message "maxlength" if value is too long', () => {
      component.form.controls[dynamicFormControl.key].setErrors({
        maxlength: true,
      });

      expect(component.errorMessage).toContain('to much characters');
    });

    it('should return message "pattern" if value does not match pattern', () => {
      component.form.controls[dynamicFormControl.key].setErrors({
        pattern: true,
      });

      expect(component.errorMessage).toContain(
        'does not match required pattern',
      );
    });
  });

  describe('using addToValue()', () => {
    it('should have "test" added to value', () => {
      component.form.controls[dynamicFormControl.key].setValue([]);

      component.addToValue('test');

      expect(component.form.controls[dynamicFormControl.key].value).toEqual([
        'test',
      ]);
    });
  });

  describe('using removeFromValue()', () => {
    it('should have "test" removed from value', () => {
      component.form.controls[dynamicFormControl.key].setValue(['test']);

      component.removeFromValue('test');

      expect(component.form.controls[dynamicFormControl.key].value).toEqual([]);
    });
  });
});
