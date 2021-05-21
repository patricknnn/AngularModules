import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() appearance: "legacy" | "standard" | "fill" | "outline" = "fill";
  @Input() color: "primary" | "accent" | "warn" = "primary";
  @Input() allowInvalidSubmit: boolean = false;
  @Input() formControls!: FormControlBase<any>[];
  @Output() formSubmit = new EventEmitter<string>();
  form!: FormGroup;
  payLoad = '';

  constructor(private formControlService: FormControlService) { }

  ngOnInit() {
    this.form = this.formControlService.toFormGroup(this.formControls);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.formSubmit.emit(this.payLoad);
  }
}
