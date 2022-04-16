import { FormGroup } from '@angular/forms';
import { DynamicFormControlBuilder } from '../builders/dynamic-form-control-builder';
import { FormControlType } from '../enums/form-control-type';
import { DynamicFormControl } from '../models/dynamic-form-control';
import { DynamicFormControlAutocompleteOption } from '../models/dynamic-form-control-autocomplete-option';
import { FormControlService } from './form-control.service';

const options: DynamicFormControlAutocompleteOption[] = [{
  value: 'test',
  label: 'test',
}];
const formControls: DynamicFormControl<any>[] = [
  new DynamicFormControlBuilder<string>()
    .setKey('test')
    .setControlType(FormControlType.AUTOCOMPLETE)
    .setAutocompleteOptions(options)
    .build(),
];

describe('FormControlService', () => {
  const service: FormControlService = new FormControlService();

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add autocompleteValidator', () => {
    const formGroup: FormGroup = service.toFormGroup(formControls);

    expect(formGroup.controls['test'].validator).toBeDefined();
  });
});
