import { Component } from '@angular/core';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';

@Component({
  selector: 'app-dynamic-form-control-checkbox',
  templateUrl: './dynamic-form-control-checkbox.component.html',
  styleUrls: ['../dynamic-form-control/dynamic-form-control.component.scss']
})
export class DynamicFormControlCheckboxComponent extends DynamicFormControlComponent {
  constructor() {
    super();
  }
}
