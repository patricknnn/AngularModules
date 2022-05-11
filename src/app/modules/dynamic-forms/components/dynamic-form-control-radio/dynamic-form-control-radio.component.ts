import { Component } from '@angular/core';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';

@Component({
  selector: 'app-dynamic-form-control-radio',
  templateUrl: './dynamic-form-control-radio.component.html',
  styleUrls: ['../dynamic-form-control/dynamic-form-control.component.scss']
})
export class DynamicFormControlRadioComponent extends DynamicFormControlComponent {
  constructor() {
    super();
  }
}
