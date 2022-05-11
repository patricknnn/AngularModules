import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlTextareaComponent } from './dynamic-form-control-textarea.component';

describe('DynamicFormControlTextareaComponent', () => {
  let component: DynamicFormControlTextareaComponent;
  let fixture: ComponentFixture<DynamicFormControlTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormControlTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormControlTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
