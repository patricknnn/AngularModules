import { Component } from '@angular/core';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';

@Component({
  selector: 'app-dynamic-form-control-textarea',
  templateUrl: './dynamic-form-control-textarea.component.html',
  styleUrls: ['../dynamic-form-control/dynamic-form-control.component.scss']
})
export class DynamicFormControlTextareaComponent extends DynamicFormControlComponent {
  constructor() {
    super();
  }
}
