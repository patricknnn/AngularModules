import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlDateOfBirthComponent } from './dynamic-form-control-date-of-birth.component';

describe('DynamicFormControlDateOfBirthComponent', () => {
  let component: DynamicFormControlDateOfBirthComponent;
  let fixture: ComponentFixture<DynamicFormControlDateOfBirthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormControlDateOfBirthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormControlDateOfBirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
