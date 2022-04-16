import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { PeriodicElement } from 'src/app/models/periodic-element';
import { DynamicFormComponent } from 'src/app/modules/dynamic-forms/components/dynamic-form/dynamic-form.component';
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

  @ViewChild('dynamicForm') dynamicForm?: DynamicFormComponent;

  constructor(private formService: FormService, private http: HttpClient) {
    this.model = formService.getModel();
    this.formControls = this.formService.create();
  }

  toggleDisabled(): void {
    this.formControlsDisabled = !this.formControlsDisabled;
    const controls: any = this.formService.create();

    controls.forEach((control: any) => {
      control.disabled = this.formControlsDisabled;
    });

    this.formControls = controls;
  }

  logElement(): void {
    console.log(this.model);
  }
}
