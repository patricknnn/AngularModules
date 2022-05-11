import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlDateRangeComponent } from './dynamic-form-control-date-range.component';

describe('DynamicFormControlDateRangeComponent', () => {
  let component: DynamicFormControlDateRangeComponent;
  let fixture: ComponentFixture<DynamicFormControlDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormControlDateRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormControlDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
