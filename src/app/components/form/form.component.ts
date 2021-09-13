import { Component } from '@angular/core';
import { PeriodicElement } from 'src/app/models/periodic-element';
import { DynamicFormControl } from 'src/app/modules/dynamic-forms/models/dynamic-form-control';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  isFormValid: boolean;
  formControls: DynamicFormControl<any>[];
  element: PeriodicElement;

  constructor(formService: FormService) {
    this.isFormValid = false;
    this.element = formService.getElement();
    this.formControls = formService.getFormControls();
  }

  logElement(): void {
    console.log(this.element);
  }
}
