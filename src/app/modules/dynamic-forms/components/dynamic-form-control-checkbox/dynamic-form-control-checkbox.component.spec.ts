import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlCheckboxComponent } from './dynamic-form-control-checkbox.component';

describe('DynamicFormControlCheckboxComponent', () => {
  let component: DynamicFormControlCheckboxComponent;
  let fixture: ComponentFixture<DynamicFormControlCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormControlCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormControlCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
