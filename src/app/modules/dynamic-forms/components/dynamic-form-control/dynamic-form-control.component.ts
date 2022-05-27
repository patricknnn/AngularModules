import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatColor } from 'src/app/enums/material/mat-color';
import { MatFormAppearance } from 'src/app/enums/material/mat-form-appearance';
import { DynamicFormControl } from '../../models/dynamic-form-control';
import { DynamicFormControlAutocompleteOption } from '../../models/dynamic-form-control-autocomplete-option';
import { DynamicFormControlValueChange } from '../../models/dynamic-form-control-value-change';

@Component({
  template: '',
  animations: [
    trigger('errorAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-5px)', opacity: 0 }),
        animate('150ms ease-in', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class DynamicFormControlComponent implements OnInit, OnDestroy {
  @Input() public control!: DynamicFormControl<any>;
  @Input() public form!: FormGroup;
  @Input() public appearance!: MatFormAppearance;
  @Input() public color!: MatColor;

  @Output() public formControlValueChange: EventEmitter<DynamicFormControlValueChange> = new EventEmitter<DynamicFormControlValueChange>();

  public abstractControl?: AbstractControl | null;
  public abstractControlToSubscribe?: AbstractControl | null;

  public controlSubscription?: Subscription;

  public ngOnInit(): void {
    this.abstractControl = this.form.controls[this.control.key];

    this.controlSubscription = this.abstractControl.valueChanges.subscribe(() => {
      if (this.abstractControl?.valid) {
        const valueChange: DynamicFormControlValueChange = {
          key: this.control.key,
          value: this.abstractControl?.value,
        };
        this.formControlValueChange.emit(valueChange);
      }
    });
  }

  public ngOnDestroy(): void {
    this.controlSubscription?.unsubscribe();
  }

  public get isRequired(): boolean {
    return this.control.validators.includes(Validators.required);
  }

  public get isValid(): boolean {
    return this.abstractControl?.valid || false;
  }

  public get isTouched(): boolean {
    return this.abstractControl?.touched || false;
  }

  public get errorMessage(): string {
    const label: string = this.control.label;

    if (this.hasError('required') || this.hasError('requiredtrue')) {
      return label + 'form-control.errors.required';
    } else if (this.hasError('min')) {
      return label + 'form-control.errors.min';
    } else if (this.hasError('max')) {
      return label + 'form-control.errors.max';
    } else if (this.hasError('email')) {
      return label + 'form-control.errors.email';
    } else if (this.hasError('minlength')) {
      return label + 'form-control.errors.min-length';
    } else if (this.hasError('maxlength')) {
      return label + 'form-control.errors.max-length';
    } else if (this.hasError('pattern')) {
      return label + 'form-control.errors.pattern';
    } else if (this.hasError('autocomplete')) {
      return label + 'form-control.errors.autocomplete';
    } else if (this.hasError('minAge')) {
      return label + 'form-control.errors.minAge';
    } else {
      return '';
    }
  }

  public markAsTouched(): void {
    this.abstractControl?.markAsTouched();
  }

  public hasError(error: string): boolean | undefined {
    return (
      this.abstractControl?.hasError(error) ||
      this.abstractControl?.get('start')?.hasError(error) ||
      this.abstractControl?.get('end')?.hasError(error)
    );
  }

  public getAutocompleteOptionByValue(value: string): DynamicFormControlAutocompleteOption | undefined {
    const filteredOptions: DynamicFormControlAutocompleteOption[] =
      this.control.autocompleteOptions.filter(
        (option: DynamicFormControlAutocompleteOption) => {
          return option.value.toLowerCase() === value.toLowerCase();
        }
      );

    return filteredOptions.length == 1 ? filteredOptions[0] : undefined;
  }

  public filterAutocompleteOptionsByLabel(label: string): DynamicFormControlAutocompleteOption[] {
    return this.control.autocompleteOptions.filter((option: DynamicFormControlAutocompleteOption) => {
      return option.label.toLowerCase().includes(label.toLowerCase());
    });
  }
}
