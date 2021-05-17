import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlBase } from '../models/form-control-base';

@Injectable()
export class FormControlService {
  constructor() { }

  toFormGroup(formControls: FormControlBase<any>[]) {
    const group: any = {};

    formControls.forEach(formControl => {
      group[formControl.key] = new FormControl(formControl.value || '', formControl.validators);
    });

    return new FormGroup(group);
  }
}
