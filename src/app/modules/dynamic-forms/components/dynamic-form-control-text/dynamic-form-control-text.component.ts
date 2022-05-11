import { Component } from '@angular/core';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';

@Component({
  selector: 'app-dynamic-form-control-text',
  templateUrl: './dynamic-form-control-text.component.html',
  styleUrls: ['../dynamic-form-control/dynamic-form-control.component.scss']
})
export class DynamicFormControlTextComponent extends DynamicFormControlComponent {
  constructor() {
    super();
  }
}
