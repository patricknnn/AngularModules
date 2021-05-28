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

  /**
   * Returns form controls
   * @returns Observable stream of form controls
   */
  getFormControls(): Observable<FormControlBase<any>[]> {
    const formControls: FormControlBase<any>[] = [
      new FormControlText({
        key: 'text',
        label: 'Text',
        class: 'column',
        order: 1
      }),
      new FormControlDropdown({
        key: 'dropdown',
        label: 'Dropdown',
        class: 'column',
        options: [
          { key: 'one', value: 'One' },
          { key: 'two', value: 'Two' },
          { key: 'three', value: 'Three' }
        ],
        order: 2
      }),
      new FormControlDate({
        key: 'date',
        label: 'Date',
        class: 'column',
        order: 3
      }),
      new FormControlDateRange({
        key: 'daterange',
        label: 'Date range',
        class: 'column',
        order: 4
      }),
      new FormControlTextArea({
        key: 'textarea',
        label: 'Textarea',
        class: 'column',
        order: 7
      }),
      new FormControlChips({
        key: 'chips',
        label: 'Chip list',
        value: ['One', 'Two'],
        class: 'column',
        selectable: true,
        removable: true,
        addOnBlur: true,
        validators: [Validators.required],
        order: 6
      }),
      new FormControlRadio({
        key: 'radio',
        label: 'Radio',
        floatLabel: 'always',
        class: 'column radio-group-vertical',
        options: [
          { key: 'one', value: 'One' },
          { key: 'two', value: 'Two' },
          { key: 'three', value: 'Three' }
        ],
        order: 5,
        validators: [Validators.required]
      }),
      new FormControlCheckbox({
        key: 'checkbox',
        label: 'Checkbox',
        floatLabel: 'always',
        placeholder: 'Please check this box',
        class: 'column',
        indeterminate: false,
        validators: [Validators.required],
        order: 8
      }),
      new FormControlSlide({
        key: 'slide',
        label: 'Slide toggle',
        floatLabel: 'always',
        placeholder: 'Please slide this slide toggle',
        class: 'column',
        validators: [Validators.required],
        order: 9
      })
    ];
    return of(formControls.sort((a, b) => a.order - b.order));
  }
}
