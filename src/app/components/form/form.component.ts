import { Component } from '@angular/core';
import { DynamicFormControl } from 'src/app/modules/dynamic-forms/models/dynamic-form-control';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  formControls?: DynamicFormControl<any>[];
  formControlsDisabled: boolean = false;
  model: any;

  constructor(private formService: FormService) {
    this.model = formService.getModel();
    this.formControls = this.formService.create();
  }

  toggleDisabled(): void {
    this.formControlsDisabled = !this.formControlsDisabled;

    const controls: any = this.formControls
    controls.forEach((control: any) => {
      control.disabled = this.formControlsDisabled;
    });

    this.formControls = controls;
  }

  logElement(): void {
    console.log(this.model);
  }
}
