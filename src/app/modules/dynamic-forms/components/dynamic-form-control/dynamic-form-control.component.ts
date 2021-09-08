import { Component, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicFormControl } from '../../models/dynamic-form-control';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss'],
  animations: [
    trigger('errorAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DynamicFormControlComponent {
  @Input() public control!: DynamicFormControl<any>;
  @Input() public form!: FormGroup;
  @Input() public appearance!: 'legacy' | 'standard' | 'fill' | 'outline';
  @Input() public color!: 'primary' | 'accent' | 'warn';

  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public dateRange: FormGroup = new FormGroup(
    {
      start: new FormControl(),
      end: new FormControl(),
    });

  private readonly formFieldControls: string[] = [
    'text',
    'textarea',
    'dropdown',
    'date',
    'date-range',
    'chips',
  ];

  public get isFormFieldControl(): boolean {
    return this.formFieldControls.includes(this.control.controlType);
  }

  public get isRequired(): boolean {
    return this.control.validators.includes(Validators.required);
  }

  public get isValid(): boolean {
    return this.form.controls[this.control.key].valid;
  }

  public get isTouched(): boolean {
    return this.form.controls[this.control.key].touched;
  }

  public get errorMessage(): string {
    const label: string = this.control.label;

    if (this.hasError('required') || this.hasError('requiredtrue')) {
      return label + ' is required';
    } else if (this.hasError('min')) {
      return label + ' is too low';
    } else if (this.hasError('max')) {
      return label + ' is too high';
    } else if (this.hasError('email')) {
      return label + ' is not a valid email';
    } else if (this.hasError('minlength')) {
      return label + ' does not have enough characters';
    } else if (this.hasError('maxlength')) {
      return label + ' has to much characters';
    } else if (this.hasError('pattern')) {
      return label + ' does not match required pattern';
    } else {
      return '';
    }
  }

  public markAsTouched(): void {
    this.form.controls[this.control.key].markAsTouched();
  }

  public setDateRange(): void {
    this.form.controls[this.control.key].setValue(this.dateRange.value);
  }

  public addToValue(item: string): void {
    const value: string = item.trim();
    const controlValue: Array<string> = this.form.controls[this.control.key].value;

    if (value && controlValue instanceof Array) {
      controlValue.push(value);
      this.form.controls[this.control.key].setValue(controlValue);
    }
  }

  public removeFromValue(item: string): void {
    const controlValue: Array<string> = this.form.controls[this.control.key].value;
    const index: number = controlValue.indexOf(item);

    if (index >= 0) {
      controlValue.splice(index, 1);
      this.form.controls[this.control.key].setValue(controlValue);
    }
  }

  private hasError(error: string): boolean {
    return this.form.controls[this.control.key].hasError(error);
  }
}
