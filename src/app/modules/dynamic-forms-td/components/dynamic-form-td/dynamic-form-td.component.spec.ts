import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormTdComponent } from './dynamic-form-td.component';

describe('DynamicFormTdComponent', () => {
  let component: DynamicFormTdComponent;
  let fixture: ComponentFixture<DynamicFormTdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormTdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
