import { Component } from '@angular/core';
import { PeriodicElement } from 'src/app/models/periodic-element';
import { ModelFormControl } from 'src/app/modules/dynamic-forms-td/components/dynamic-form-td/dynamic-form-td.component';
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
  modelFormControls: ModelFormControl[];

  constructor(formService: FormService) {
    this.isFormValid = false;
    this.element = formService.getElement();
    this.formControls = formService.getFormControls(this.element);
    this.modelFormControls = [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'symbol', label: 'Symbol', type: 'text' },
      { key: 'position', label: 'Position', type: 'text' },
      { key: 'weight', label: 'Weight', type: 'text' },
    ];
  }

  handleFormSubmit(event: any): void {
    console.log(event);
  }

  logElement(): void {
    console.log(this.element);
  }
}
