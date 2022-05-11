import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlRadioComponent } from './dynamic-form-control-radio.component';

describe('DynamicFormControlRadioComponent', () => {
  let component: DynamicFormControlRadioComponent;
  let fixture: ComponentFixture<DynamicFormControlRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormControlRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormControlRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
