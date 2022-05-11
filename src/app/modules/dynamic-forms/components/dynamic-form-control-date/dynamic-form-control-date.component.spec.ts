import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlDateComponent } from './dynamic-form-control-date.component';

describe('DynamicFormControlDateComponent', () => {
  let component: DynamicFormControlDateComponent;
  let fixture: ComponentFixture<DynamicFormControlDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormControlDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormControlDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
