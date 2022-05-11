import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlTextComponent } from './dynamic-form-control-text.component';

describe('DynamicFormControlTextComponent', () => {
  let component: DynamicFormControlTextComponent;
  let fixture: ComponentFixture<DynamicFormControlTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormControlTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormControlTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
