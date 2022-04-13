import { Component, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormControl } from '../../models/dynamic-form-control';
import { DynamicFormControlValueChange } from '../../models/dynamic-form-control-value-change';
import { FormControlService } from '../../services/form-control.service';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [FormControlService],
})
export class DynamicFormComponent implements OnChanges {
  @Input() public formAppearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'fill';
  @Input() public formColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() public formControls: DynamicFormControl<any>[] | null = null;
  @Input() public formModel: any = {};

  @Output() public formValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public formModelChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren('dynamicFormControl') dynamicFormControls?: QueryList<DynamicFormControlComponent>;

  public form!: FormGroup;

  public constructor(private readonly formControlService: FormControlService) { }

  public get isFormValid(): boolean {
    let valid: boolean = true;

    this.dynamicFormControls?.forEach((control: DynamicFormControlComponent) => {
      if (!control.isValid) {
        valid = control.isValid;
      }
    });

    return valid;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.formControls) {
      this.buildForm();
    }
  }

  public buildForm(): void {
    if (this.formControls) {
      this.formControls.forEach((formControl: DynamicFormControl<any>) => {
        formControl.value = this.getModelValue(formControl.key);
      });

      this.form = this.formControlService.toFormGroup(this.formControls);
    }
  }

  public markFormAsTouched(): void {
    this.form.markAllAsTouched();
  }

  public handleControlValueChange(valueChange: DynamicFormControlValueChange): void {
    this.setModelValue(this.formModel, valueChange.key, valueChange.value);
    this.formModelChange.emit(this.formModel);
  }
  
  private getModelValue(modelKey: string): any {
    return modelKey
      .split('.')
      .reduce((previousValue: any, currentValue: string) => previousValue?.[currentValue], this.formModel);
  }

  private setModelValue(model: any, key: string, value: any): void {
    const [head, ...rest]: any = key.split('.');

    if (!rest.length) {
      model[head] = value;
    } else {
      this.setModelValue(model[head], rest.join('.'), value);
    }
  }
}
