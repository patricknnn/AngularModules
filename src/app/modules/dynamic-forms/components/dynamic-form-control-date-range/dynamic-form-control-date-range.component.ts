import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DynamicFormControlValueChange } from '../../models/dynamic-form-control-value-change';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';

@Component({
  selector: 'app-dynamic-form-control-date-range',
  templateUrl: './dynamic-form-control-date-range.component.html',
  styleUrls: ['../dynamic-form-control/dynamic-form-control.component.scss']
})
export class DynamicFormControlDateRangeComponent extends DynamicFormControlComponent {
  public dateRange: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.dateRange.setValue(this.control.value);
    this.dateRange.setValidators(this.control.validators);
    this.abstractControl = this.dateRange;

    this.controlSubscription = this.abstractControl.valueChanges.subscribe(() => {
      if (this.abstractControl?.valid) {
        let valueToEmit: any = this.abstractControl?.value;

        const valueChange: DynamicFormControlValueChange = {
          key: this.control.key,
          value: valueToEmit,
        };
        this.formControlValueChange.emit(valueChange);
      }
    });
  }

  public setDateRange(): void {
    this.abstractControl?.setValue(this.dateRange.value);
  }
}
