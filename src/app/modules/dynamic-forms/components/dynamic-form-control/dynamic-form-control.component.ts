import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DynamicFormControl } from '../../models/dynamic-form-control';
import { trigger, transition, style, animate } from '@angular/animations';
import { DynamicFormControlValueChange } from '../../models/dynamic-form-control-value-change';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { FormControlType } from '../../enums/form-control-type';
import { DynamicFormControlAutocompleteOption } from '../../models/dynamic-form-control-autocomplete-option';

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
export class DynamicFormControlComponent implements OnInit, OnDestroy {
  @Input() public control!: DynamicFormControl<any>;
  @Input() public form!: FormGroup;
  @Input() public appearance!: 'legacy' | 'standard' | 'fill' | 'outline';
  @Input() public color!: 'primary' | 'accent' | 'warn';

  @Output()
  public formControlValueChange: EventEmitter<DynamicFormControlValueChange> = new EventEmitter<DynamicFormControlValueChange>();

  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public dateRange: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  public filteredAutocompleteOptions?: Observable<DynamicFormControlAutocompleteOption[]>;

  private readonly formFieldControls: string[] = [
    'text',
    'textarea',
    'dropdown',
    'date',
    'date-range',
    'chips',
  ];
  private controlSubscription?: Subscription;
  private abstractControl?: AbstractControl | null;

  public ngOnInit(): void {
    if (this.control.controlType == 'date-range') {
      this.dateRange.setValue(this.control.value);
    }

    this.abstractControl = this.form.controls[this.control.key];

    if (this.control.controlType == FormControlType.TEXT && this.control.autocompleteOptions.length) {
      this.filteredAutocompleteOptions = this.abstractControl.valueChanges.pipe(
        startWith(''),
        map((value: string) => this.filterAutocompleteOptions(value)),
      );
    }


    this.controlSubscription = this.abstractControl.valueChanges
      .pipe(
        tap(() => {
          const valueChange: DynamicFormControlValueChange = {
            key: this.control.key,
            value: this.abstractControl?.value,
          };
          this.formControlValueChange.emit(valueChange);
        }),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.controlSubscription?.unsubscribe();
  }

  public get isFormFieldControl(): boolean {
    return this.formFieldControls.includes(this.control.controlType);
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
    } else if (this.hasError('autocomplete')) {
      return label + ' does not match any autocomplete option';
    } else {
      return '';
    }
  }

  public markAsTouched(): void {
    this.abstractControl?.markAsTouched();
  }

  public setDateRange(): void {
    this.abstractControl?.setValue(this.dateRange.value);
  }

  public addToValue(item: string): void {
    const value: string = item.trim();
    const controlValue: Array<string> = this.abstractControl?.value || [];

    if (value && controlValue instanceof Array) {
      controlValue.push(value);
      this.abstractControl?.setValue(controlValue);
    }
  }

  public removeFromValue(item: string): void {
    const controlValue: Array<string> = this.abstractControl?.value;
    const index: number = controlValue.indexOf(item);

    if (index >= 0) {
      controlValue.splice(index, 1);
      this.abstractControl?.setValue(controlValue);
    }
  }

  private hasError(error: string): boolean | undefined {
    return this.abstractControl?.hasError(error);
  }

  private filterAutocompleteOptions(value: string): DynamicFormControlAutocompleteOption[] {
    return this.control.autocompleteOptions.filter((option: DynamicFormControlAutocompleteOption) => {
      return option.value.toLowerCase().includes(value.toLowerCase());
    });
  }
}
