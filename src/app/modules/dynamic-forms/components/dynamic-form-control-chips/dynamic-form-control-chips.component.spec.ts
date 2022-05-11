import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlChipsComponent } from './dynamic-form-control-chips.component';

describe('DynamicFormControlChipsComponent', () => {
  let component: DynamicFormControlChipsComponent;
  let fixture: ComponentFixture<DynamicFormControlChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormControlChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormControlChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
