import { Component } from '@angular/core';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';

@Component({
  selector: 'app-dynamic-form-control-date',
  templateUrl: './dynamic-form-control-date.component.html',
  styleUrls: ['../dynamic-form-control/dynamic-form-control.component.scss']
})
export class DynamicFormControlDateComponent extends DynamicFormControlComponent {
  constructor() {
    super();
  }
}
