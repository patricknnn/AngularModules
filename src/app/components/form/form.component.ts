import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormControlBase } from 'src/app/modules/dynamic-forms/models/form-control-base';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  formControls$: Observable<FormControlBase<any>[]>;
  appearanceOptions = ["legacy", "standard", "fill", "outline"];
  colorOptions = ["primary", "accent", "warn"];
  options: FormGroup;
  appearanceControl = new FormControl('fill');
  colorControl = new FormControl('primary');
  submitControl = new FormControl(false);

  constructor(
    formService: FormService,
    fb: FormBuilder
  ) {
    this.formControls$ = formService.getFormControls();
    this.options = fb.group({
      color: this.colorControl,
      appearance: this.appearanceControl,
      submit: this.submitControl,
    });
  }

  handleFormSubmit(event: any): void {
    console.log(event);
  }
}
