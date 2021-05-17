import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FormControlBase } from '../../models/form-control-base';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss']
})
export class DynamicFormControlComponent {
  @Input() control!: FormControlBase<any>;
  @Input() form!: FormGroup;
  @Input() formStyle!: MatFormFieldAppearance;
  @Input() formColor!: string;
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  setDateRange(): void {
    this.form.controls[this.control.key].setValue(this.dateRange.value);
  }

  addToValue(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let controlValue = this.form.controls[this.control.key].value;
    if (value && controlValue instanceof Array) {
      controlValue.push(value);
      this.form.controls[this.control.key].setValue(controlValue);
    }
    event.chipInput!.clear();
  }

  removeFromValue(item: string): void {
    let controlValue = this.form.controls[this.control.key].value;
    const index = controlValue.indexOf(item);
    if (index >= 0) {
      controlValue.splice(index, 1);
      this.form.controls[this.control.key].setValue(controlValue);
    }
  }
}
