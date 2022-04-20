import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { DynamicFormControl } from '../../models/dynamic-form-control';
import { trigger, transition, style, animate } from '@angular/animations';
import { DynamicFormControlValueChange } from '../../models/dynamic-form-control-value-change';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControlType } from '../../enums/form-control-type';
import { DynamicFormControlAutocompleteOption } from '../../models/dynamic-form-control-autocomplete-option';
import { MatColor } from 'src/app/enums/material/mat-color';
import { MatFormAppearance } from 'src/app/enums/material/mat-form-appearance';

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
  @Input() public appearance!: MatFormAppearance;
  @Input() public color!: MatColor;

  @Output()
  public formControlValueChange: EventEmitter<DynamicFormControlValueChange> = new EventEmitter<DynamicFormControlValueChange>();

  @ViewChild('chipInput') chipInput?: ElementRef<HTMLInputElement>;

  public chipControl: FormControl = new FormControl();

  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public dateRange: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  public filteredAutocompleteOptions?: Observable<DynamicFormControlAutocompleteOption[]>;
  public selectedAutocompleteOption?: DynamicFormControlAutocompleteOption;
  public selectedAutocompleteOptions: DynamicFormControlAutocompleteOption[] = [];
  public abstractControl?: AbstractControl | null;
  public abstractControlToSubscribe?: AbstractControl | null;

  private readonly formFieldControls: string[] = [
    'autocomplete',
    'text',
    'textarea',
    'dropdown',
    'date',
    'date-of-birth',
    'date-range',
    'chips',
  ];
  private controlSubscription?: Subscription;

  public ngOnInit(): void {
    if (this.control.controlType === FormControlType.DATE_RANGE) {
      this.dateRange.setValue(this.control.value);
      this.dateRange.setValidators(this.control.validators);
      this.abstractControl = this.dateRange;
    } else {
      this.abstractControl = this.form.controls[this.control.key];
    }

    if (this.isAutocompleteControl) {
      this.initAutocompleteControl();
    }

    this.controlSubscription = this.abstractControl.valueChanges.subscribe(() => {
      this.selectedAutocompleteOption = undefined;

      if (this.abstractControl?.valid) {
        let valueToEmit: any = this.abstractControl?.value;

        if (
          this.isAutocompleteControl &&
          this.control.controlType === FormControlType.AUTOCOMPLETE
        ) {
          valueToEmit = this.abstractControl?.value.value;
        }

        if (
          this.isAutocompleteControl &&
          this.control.controlType === FormControlType.CHIPS
        ) {
          valueToEmit = [];
          this.selectedAutocompleteOptions.forEach((option) => {
            valueToEmit.push(option.value);
          });
        }

        const valueChange: DynamicFormControlValueChange = {
          key: this.control.key,
          value: valueToEmit,
        };
        this.formControlValueChange.emit(valueChange);
      }
    }
    );
  }

  public ngOnDestroy(): void {
    this.controlSubscription?.unsubscribe();
  }

  public get isFormFieldControl(): boolean {
    return this.formFieldControls.includes(this.control.controlType);
  }

  public get isAutocompleteControl(): boolean {
    if (
      this.control.controlType === FormControlType.CHIPS &&
      this.control.autocompleteOptions.length
    ) {
      return true;
    }
    return this.control.controlType === FormControlType.AUTOCOMPLETE;
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

  public getMinAgeDate(): Date {
    const date: Date = new Date();
    date.setFullYear(new Date().getFullYear() - this.control.minAge);

    return date;
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

  public getAutocompleteDisplayValue(option: DynamicFormControlAutocompleteOption): string {
    return option.label ? option.label : option.value;
  }

  public setSelectedAutocompleteOption(option: DynamicFormControlAutocompleteOption): void {
    this.selectedAutocompleteOption = option;
  }

  public addSelectedAutocompleteOption(option: DynamicFormControlAutocompleteOption): void {
    const controlValue: Array<any> = this.abstractControl?.value || [];

    if (option && controlValue instanceof Array) {
      controlValue.push(option);
      this.abstractControl?.setValue(controlValue);
    }

    this.abstractControlToSubscribe?.setValue('');
    this.chipInput!.nativeElement.value = '';
  }

  public removeSelectedAutocompleteOption(option: DynamicFormControlAutocompleteOption): void {
    const controlValue: Array<any> = this.abstractControl?.value;
    const index: number = controlValue.indexOf(option);

    if (index >= 0) {
      controlValue.splice(index, 1);
      this.abstractControl?.setValue(controlValue);
    }

    this.abstractControlToSubscribe?.setValue('');
    this.chipInput!.nativeElement.value = '';
  }

  private getAutocompleteOptionByValue(value: string): DynamicFormControlAutocompleteOption | undefined {
    const filteredOptions: DynamicFormControlAutocompleteOption[] =
      this.control.autocompleteOptions.filter(
        (option: DynamicFormControlAutocompleteOption) => {
          return option.value.toLowerCase() === value.toLowerCase();
        }
      );

    return filteredOptions.length == 1 ? filteredOptions[0] : undefined;
  }

  private initAutocompleteControl(): void {
    if (this.control.controlType === FormControlType.AUTOCOMPLETE) {
      this.selectedAutocompleteOption = this.control.value
        ? this.getAutocompleteOptionByValue(this.control.value)
        : undefined;
      this.abstractControl?.setValue(this.selectedAutocompleteOption || '');

      this.abstractControlToSubscribe = this.abstractControl;
    }

    if (this.control.controlType === FormControlType.CHIPS) {
      this.control.value.forEach((value: string) => {
        const option: DynamicFormControlAutocompleteOption | undefined = this.getAutocompleteOptionByValue(value);
        if (option) {
          this.selectedAutocompleteOptions.push(option);
        }
      });
      this.abstractControl?.setValue(this.selectedAutocompleteOptions);

      this.abstractControlToSubscribe = this.chipControl;
    }

    this.filteredAutocompleteOptions = this.abstractControlToSubscribe?.valueChanges.pipe(
      startWith(''),
      map((value: string | DynamicFormControlAutocompleteOption) => typeof value === 'string' ? value : value.label),
      map((label: string) => label
        ? this.filterAutocompleteOptionsBySelected(this.filterAutocompleteOptionsByLabel(label))
        : this.filterAutocompleteOptionsBySelected(this.control.autocompleteOptions.slice()))
    );
  }

  private filterAutocompleteOptionsByLabel(label: string): DynamicFormControlAutocompleteOption[] {
    return this.control.autocompleteOptions.filter((option: DynamicFormControlAutocompleteOption) => {
      return option.label.toLowerCase().startsWith(label.toLowerCase());
    });
  }

  private filterAutocompleteOptionsBySelected(options: DynamicFormControlAutocompleteOption[]): DynamicFormControlAutocompleteOption[] {
    return options.filter((option: DynamicFormControlAutocompleteOption) => !this.selectedAutocompleteOptions.includes(option));
  }

  private hasError(error: string): boolean | undefined {
    return (
      this.abstractControl?.hasError(error) ||
      this.abstractControl?.get('start')?.hasError(error) ||
      this.abstractControl?.get('end')?.hasError(error)
    );
  }
}
