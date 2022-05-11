import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormControlBuilder } from '../../builders/dynamic-form-control-builder';
import { DynamicFormControl } from '../../models/dynamic-form-control';
import { DynamicFormControlAutocompleteOption } from '../../models/dynamic-form-control-autocomplete-option';
import { FormControlService } from '../../services/form-control.service';
import { DynamicFormControlChipsComponent } from './dynamic-form-control-chips.component';

const dynamicFormControl: DynamicFormControl<any> = new DynamicFormControlBuilder<string>().build();
const formGroup: FormGroup = new FormControlService().toFormGroup([dynamicFormControl]);
const dynamicFormControlAutocompleteOption: DynamicFormControlAutocompleteOption = { value: 'value', label: 'label' };

let component: DynamicFormControlChipsComponent;
let fixture: ComponentFixture<DynamicFormControlChipsComponent>;

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(DynamicFormControlChipsComponent);
  component = fixture.componentInstance;
  component.form = formGroup;
  component.control = dynamicFormControl;
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

describe('DynamicFormControlChipsComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DynamicFormControlChipsComponent],
      imports: [BrowserAnimationsModule],
    }).compileComponents();

    await createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addSelectedAutocompleteOption should add selected autocomplete option', () => {
    component.addSelectedAutocompleteOption(dynamicFormControlAutocompleteOption);

    expect(component.abstractControl?.value).toContain(dynamicFormControlAutocompleteOption);
    expect(component.abstractControlToSubscribe?.value).toEqual('');
    expect(component.chipInput!.nativeElement.value).toEqual('');
  });

  it('addSelectedAutocompleteOption should add selected autocomplete option', () => {
    component.removeSelectedAutocompleteOption(dynamicFormControlAutocompleteOption);

    expect(component.abstractControl?.value).not.toContain(dynamicFormControlAutocompleteOption);
    expect(component.abstractControlToSubscribe?.value).toEqual('');
    expect(component.chipInput!.nativeElement.value).toEqual('');
  });
});
