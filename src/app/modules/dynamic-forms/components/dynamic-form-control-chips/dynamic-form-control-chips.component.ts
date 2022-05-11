import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map, Observable } from 'rxjs';
import { DynamicFormControlAutocompleteOption } from '../../models/dynamic-form-control-autocomplete-option';
import { DynamicFormControlValueChange } from '../../models/dynamic-form-control-value-change';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';

@Component({
  selector: 'app-dynamic-form-control-chips',
  templateUrl: './dynamic-form-control-chips.component.html',
  styleUrls: ['../dynamic-form-control/dynamic-form-control.component.scss']
})
export class DynamicFormControlChipsComponent extends DynamicFormControlComponent {
  public selectedAutocompleteOptions: DynamicFormControlAutocompleteOption[] = [];
  public chipControl: FormControl = new FormControl();
  public filteredAutocompleteOptions?: Observable<DynamicFormControlAutocompleteOption[]>;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('chipInput') chipInput?: ElementRef<HTMLInputElement>;

  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.abstractControl = this.form.controls[this.control.key];

    this.initAutocompleteControl();

    this.controlSubscription = this.abstractControl.valueChanges.subscribe(() => {
      if (this.abstractControl?.valid) {
        let valueToEmit: any = [];

        this.selectedAutocompleteOptions.forEach((option) => {
          valueToEmit.push(option.value);
        });

        const valueChange: DynamicFormControlValueChange = {
          key: this.control.key,
          value: valueToEmit,
        };

        this.formControlValueChange.emit(valueChange);
      }
    });
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

  private initAutocompleteControl(): void {
    this.control.value.forEach((value: string) => {
      const option: DynamicFormControlAutocompleteOption | undefined = this.getAutocompleteOptionByValue(value);
      if (option) {
        this.selectedAutocompleteOptions.push(option);
      }
    });
    this.abstractControl?.setValue(this.selectedAutocompleteOptions);

    this.abstractControlToSubscribe = this.chipControl;

    this.filteredAutocompleteOptions = this.abstractControlToSubscribe?.valueChanges.pipe(
      startWith(''),
      map((value: string | DynamicFormControlAutocompleteOption) => typeof value === 'string' ? value : value.label),
      map((label: string) => label
        ? this.filterAutocompleteOptionsBySelected(this.filterAutocompleteOptionsByLabel(label))
        : this.filterAutocompleteOptionsBySelected(this.control.autocompleteOptions.slice()))
    );
  }

  private filterAutocompleteOptionsBySelected(options: DynamicFormControlAutocompleteOption[]): DynamicFormControlAutocompleteOption[] {
    return options.filter((option: DynamicFormControlAutocompleteOption) => !this.selectedAutocompleteOptions.includes(option));
  }
}
