import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { DynamicFormControl } from '../../models/dynamic-form-control';
import { FormControlService } from '../../services/form-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [FormControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() public formAppearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'fill';
  @Input() public formColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() public formControls: DynamicFormControl<any>[] = [];
  @Input() public formValid: boolean = false;
  @Input() public formModel: any = {};

  @Output() public formValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public formModelChange: EventEmitter<any> = new EventEmitter<any>();

  public form!: FormGroup;

  public constructor(private readonly formControlService: FormControlService) {}

  public ngOnInit(): void {
    // set control values based on model values
    this.formControls.forEach((formControl: DynamicFormControl<any>) => {
      formControl.value = this.getModelValue(formControl.key);
    });

    // create form group
    this.form = this.formControlService.toFormGroup(this.formControls);

    // tap into value changes
    this.form.valueChanges
      .pipe(
        tap(() => {
          // set model values based on form control values
          this.formControls.forEach((formControl: DynamicFormControl<any>) => {
            this.setModelValue(
              this.formModel,
              formControl.key,
              this.form.controls[formControl.key].value
            );
          });

          // emit changes
          this.formModelChange.emit(this.formModel);
          this.formValidChange.emit(this.form.valid);
        })
      )
      .subscribe();
  }

  private getModelValue(key: string) {
    return key
      .split('.')
      .reduce((value: any, key: string) => value?.[key], this.formModel);
  }

  private setModelValue(model: any, key: string, value: any): void {
    const [head, ...rest] = key.split('.');

    !rest.length
      ? (model[head] = value)
      : this.setModelValue(model[head], rest.join('.'), value);
  }
}
