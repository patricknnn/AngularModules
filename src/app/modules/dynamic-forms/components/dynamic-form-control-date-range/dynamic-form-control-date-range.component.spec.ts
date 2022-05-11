import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormControlBuilder } from '../../builders/dynamic-form-control-builder';
import { DynamicFormControl } from '../../models/dynamic-form-control';
import { FormControlService } from '../../services/form-control.service';
import { DynamicFormControlDateRangeComponent } from './dynamic-form-control-date-range.component';

const dynamicFormControl: DynamicFormControl<any> = new DynamicFormControlBuilder<string>().build();
const formGroup: FormGroup = new FormControlService().toFormGroup([dynamicFormControl]);

let component: DynamicFormControlDateRangeComponent;
let fixture: ComponentFixture<DynamicFormControlDateRangeComponent>;

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(DynamicFormControlDateRangeComponent);
  component = fixture.componentInstance;
  component.form = formGroup;
  component.control = dynamicFormControl;
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

describe('DynamicFormControlDateRangeComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DynamicFormControlDateRangeComponent],
      imports: [BrowserAnimationsModule],
    }).compileComponents();

    await createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setDateRange should set correct date range', () => {
    const rangeValue: any = {};
    component.dateRange.setValue(rangeValue);
    component.setDateRange();

    expect(component.abstractControl?.value).toEqual(rangeValue);
  });
});
