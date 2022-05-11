import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlSelectComponent } from './dynamic-form-control-select.component';

describe('DynamicFormControlSelectComponent', () => {
  let component: DynamicFormControlSelectComponent;
  let fixture: ComponentFixture<DynamicFormControlSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormControlSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormControlSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
