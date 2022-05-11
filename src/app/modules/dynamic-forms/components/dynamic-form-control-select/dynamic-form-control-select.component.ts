import { Component } from '@angular/core';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';

@Component({
  selector: 'app-dynamic-form-control-select',
  templateUrl: './dynamic-form-control-select.component.html',
  styleUrls: ['../dynamic-form-control/dynamic-form-control.component.scss']
})
export class DynamicFormControlSelectComponent extends DynamicFormControlComponent {
  constructor() {
    super();
  }
}
