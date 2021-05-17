import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlBase } from '../../models/form-control-base';
import { FormControlService } from '../../services/form-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [FormControlService]
})
export class DynamicFormComponent implements OnInit {
  @Input() formControls!: FormControlBase<any>[];
  form!: FormGroup;
  payLoad = '';

  constructor(private formControlService: FormControlService) { }

  ngOnInit() {
    this.form = this.formControlService.toFormGroup(this.formControls);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log(this.payLoad);
  }
}
