import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlAutocompleteComponent } from './dynamic-form-control-autocomplete.component';

describe('DynamicFormControlAutocompleteComponent', () => {
  let component: DynamicFormControlAutocompleteComponent;
  let fixture: ComponentFixture<DynamicFormControlAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormControlAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormControlAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
