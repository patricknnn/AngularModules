import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FormControlBase } from 'src/app/modules/dynamic-forms/models/form-control-base';
import { FormControlCheckbox } from 'src/app/modules/dynamic-forms/models/form-control-checkbox';
import { FormControlChips } from 'src/app/modules/dynamic-forms/models/form-control-chips';
import { FormControlDate } from 'src/app/modules/dynamic-forms/models/form-control-date';
import { FormControlDateRange } from 'src/app/modules/dynamic-forms/models/form-control-date-range';
import { FormControlDropdown } from 'src/app/modules/dynamic-forms/models/form-control-dropdown';
import { FormControlRadio } from 'src/app/modules/dynamic-forms/models/form-control-radio';
import { FormControlSlide } from 'src/app/modules/dynamic-forms/models/form-control-slide';
import { FormControlText } from 'src/app/modules/dynamic-forms/models/form-control-text';
import { FormControlTextArea } from 'src/app/modules/dynamic-forms/models/form-control-textarea';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getFormControls(): Observable<FormControlBase<any>[]> {
    const formControls: FormControlBase<any>[] = [
      new FormControlText({
        key: 'text',
        label: 'Text',
        order: 1,
        validators: [Validators.required, Validators.email],
      }),
      new FormControlTextArea({
        key: 'textarea',
        label: 'Textarea',
        order: 2
      }),
      new FormControlDropdown({
        key: 'dropdown',
        label: 'Dropdown',
        options: [
          { key: 'one', value: 'One' },
          { key: 'two', value: 'Two' },
          { key: 'three', value: 'Three' }
        ],
        order: 3
      }),
      new FormControlDate({
        key: 'date',
        label: 'Date',
        order: 4
      }),
      new FormControlDateRange({
        key: 'daterange',
        label: 'Date range',
        order: 5
      }),
      new FormControlChips({
        key: 'chips',
        label: 'Chip list',
        value: ['One', 'Two'],
        selectable : true,
        removable: true,
        addOnBlur: true,
        order: 6
      }),
      new FormControlRadio({
        key: 'radio',
        label: 'Radio',
        floatLabel: 'always',
        class: 'radio-group-column',
        options: [
          { key: 'one', value: 'One' },
          { key: 'two', value: 'Two' },
          { key: 'three', value: 'Three' }
        ],
        order: 7  
      }),
      new FormControlCheckbox({
        key: 'checkbox',
        label: 'Checkbox',
        floatLabel: 'always',
        indeterminate: false,
        order: 8,
        validators: [Validators.required]
      }),
      new FormControlSlide({
        key: 'slide',
        label: 'Slide toggle',
        floatLabel: 'always',
        order: 9,
        validators: [Validators.required]
      })
    ];
    return of(formControls.sort((a, b) => a.order - b.order));
  }
}
