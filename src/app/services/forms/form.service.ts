import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormControlBuilder } from 'src/app/modules/dynamic-forms/builders/dynamic-form-control-builder';
import { FormControlType } from 'src/app/modules/dynamic-forms/enums/form-control-type';
import { DynamicFormControl } from 'src/app/modules/dynamic-forms/models/dynamic-form-control';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public create(): DynamicFormControl<any>[] {
    return [
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.AUTOCOMPLETE)
        .setKey('autocomplete')
        .setLabel('Autocomplete')
        .setAutocompleteOptions(this.getOptions())
        .setValidators([Validators.required])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.DROPDOWN)
        .setKey('dropdown')
        .setLabel('Dropdown')
        .setOptions(this.getOptions())
        .setValidators([Validators.required])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.TEXT)
        .setKey('text')
        .setLabel('Text')
        .setValidators([Validators.required])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.DATE)
        .setKey('date')
        .setLabel('Date')
        .setValidators([Validators.required])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.DATE_OF_BIRTH)
        .setKey('dateOfBirth')
        .setLabel('Date of birth')
        .setMinAge(3)
        .setValidators([Validators.required])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.DATE_RANGE)
        .setKey('dateRange')
        .setLabel('Date range')
        .setValidators([Validators.required])
        .build(),
      new DynamicFormControlBuilder<string[]>()
        .setControlType(FormControlType.CHIPS)
        .setKey('chips')
        .setLabel('Chips')
        .setAutocompleteOptions(this.getOptions())
        .setValidators([Validators.required])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.TEXT_AREA)
        .setKey('textArea')
        .setLabel('Text area')
        .setValidators([Validators.required])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.CHECKBOX)
        .setKey('checkbox')
        .setLabel('Checkbox')
        .setValidators([Validators.required])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.RADIO)
        .setKey('radio')
        .setLabel('Radio')
        .setOptions(this.getOptions())
        .setValidators([Validators.required])
        .build(),
      new DynamicFormControlBuilder<string>()
        .setControlType(FormControlType.SLIDE)
        .setKey('slide')
        .setLabel('Slide')
        .setValidators([Validators.required])
        .build(),
    ];
  }

  getOptions(): any {
    const amount: number = 5;
    const list: any[] = [];
    for (let i = 1; i < amount + 1; i++) {
      list.push({
        label: `Option ${i}`,
        value: `Option ${i}`,
        image: 'https://material.angular.io/assets/img/examples/shiba1.jpg'
      });
    };
    return list;
  }

  getModel(): any {
    return {
      autocomplete: '',
      chips: ["Option 1", "Option 5"],
      dropdown: '',
      text: '',
      date: '',
      dateOfBirth: '',
      dateRange: {
        start: '',
        end: '',
      },
      textArea: '',
      checkbox: false,
      radio: '',
      slide: false,
    };
  }
}
