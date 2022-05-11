import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormControlBuilder } from '../../builders/dynamic-form-control-builder';
import { DynamicFormControl } from '../../models/dynamic-form-control';
import { DynamicFormControlAutocompleteOption } from '../../models/dynamic-form-control-autocomplete-option';
import { FormControlService } from '../../services/form-control.service';
import { DynamicFormControlAutocompleteComponent } from './dynamic-form-control-autocomplete.component';

const dynamicFormControl: DynamicFormControl<any> = new DynamicFormControlBuilder<string>().build();
const formGroup: FormGroup = new FormControlService().toFormGroup([dynamicFormControl]);
const dynamicFormControlAutocompleteOption: DynamicFormControlAutocompleteOption = { value: 'value', label: 'label' };

let component: DynamicFormControlAutocompleteComponent;
let fixture: ComponentFixture<DynamicFormControlAutocompleteComponent>;

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(DynamicFormControlAutocompleteComponent);
  component = fixture.componentInstance;
  component.form = formGroup;
  component.control = dynamicFormControl;
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

describe('DynamicFormControlAutocompleteComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DynamicFormControlAutocompleteComponent],
      imports: [BrowserAnimationsModule],
    }).compileComponents();

    await createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getAutocompleteDisplayValue should return correct value if label is present', () => {
    expect(component.getAutocompleteDisplayValue(dynamicFormControlAutocompleteOption)).toEqual('label');
  });

  it('getAutocompleteDisplayValue should return correct value if label is present', () => {
    let option: any = dynamicFormControlAutocompleteOption;
    option.label = null;

    expect(component.getAutocompleteDisplayValue(option)).toEqual('value');
  });

  it('setSelectedAutocompleteOption should set option', () => {
    component.setSelectedAutocompleteOption(dynamicFormControlAutocompleteOption)

    expect(component.selectedAutocompleteOption).toEqual(dynamicFormControlAutocompleteOption);
  });
});
