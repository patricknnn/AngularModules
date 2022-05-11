import { Component } from '@angular/core';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';

@Component({
  selector: 'app-dynamic-form-control-date-of-birth',
  templateUrl: './dynamic-form-control-date-of-birth.component.html',
  styleUrls: ['../dynamic-form-control/dynamic-form-control.component.scss']
})
export class DynamicFormControlDateOfBirthComponent extends DynamicFormControlComponent {
  constructor() {
    super();
  }

  public getMinAgeDate(): Date {
    const date: Date = new Date();
    date.setFullYear(new Date().getFullYear() - this.control.minAge);

    return date;
  }
}
