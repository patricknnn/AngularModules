import { Component } from '@angular/core';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';

@Component({
  selector: 'app-dynamic-form-control-slide',
  templateUrl: './dynamic-form-control-slide.component.html',
  styleUrls: ['../dynamic-form-control/dynamic-form-control.component.scss']
})
export class DynamicFormControlSlideComponent extends DynamicFormControlComponent {
  constructor() {
    super();
  }
}
