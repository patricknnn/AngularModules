import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormControlBuilder } from '../../builders/dynamic-form-control-builder';
import { DynamicFormControl } from '../../models/dynamic-form-control';
import { FormControlService } from '../../services/form-control.service';
import { DynamicFormControlDateOfBirthComponent } from './dynamic-form-control-date-of-birth.component';

const dynamicFormControl: DynamicFormControl<any> = new DynamicFormControlBuilder<string>().build();
const formGroup: FormGroup = new FormControlService().toFormGroup([dynamicFormControl]);

let component: DynamicFormControlDateOfBirthComponent;
let fixture: ComponentFixture<DynamicFormControlDateOfBirthComponent>;

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(DynamicFormControlDateOfBirthComponent);
  component = fixture.componentInstance;
  component.form = formGroup;
  component.control = dynamicFormControl;
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

describe('DynamicFormControlDateOfBirthComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DynamicFormControlDateOfBirthComponent],
      imports: [BrowserAnimationsModule],
    }).compileComponents();

    await createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getMinAgeDate should return the correct date', () => {
    component.control.minAge = 16;

    expect(component.getMinAgeDate()).toBeDefined();
  });
});
