import { Component } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { DynamicFormControlAutocompleteOption } from '../../models/dynamic-form-control-autocomplete-option';
import { DynamicFormControlValueChange } from '../../models/dynamic-form-control-value-change';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';

@Component({
  selector: 'app-dynamic-form-control-autocomplete',
  templateUrl: './dynamic-form-control-autocomplete.component.html',
  styleUrls: ['../dynamic-form-control/dynamic-form-control.component.scss']
})
export class DynamicFormControlAutocompleteComponent extends DynamicFormControlComponent {
  public filteredAutocompleteOptions?: Observable<DynamicFormControlAutocompleteOption[]>;
  public selectedAutocompleteOption?: DynamicFormControlAutocompleteOption;
  public selectedAutocompleteOptions: DynamicFormControlAutocompleteOption[] = [];

  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.abstractControl = this.form.controls[this.control.key];

    this.initAutocompleteControl();

    this.controlSubscription = this.abstractControl.valueChanges.subscribe(() => {
       if (this.abstractControl?.valid) {
        let valueToEmit: any = this.abstractControl?.value.value;

        const valueChange: DynamicFormControlValueChange = {
          key: this.control.key,
          value: valueToEmit,
        };
        this.formControlValueChange.emit(valueChange);
      }
    });
  }

  public getAutocompleteDisplayValue(option: DynamicFormControlAutocompleteOption): string {
    return option.label ? option.label : option.value;
  }

  public setSelectedAutocompleteOption(option: DynamicFormControlAutocompleteOption): void {
    this.selectedAutocompleteOption = option;
  }

  private initAutocompleteControl(): void {
    this.selectedAutocompleteOption = this.getAutocompleteOptionByValue(this.control.value);
    this.abstractControl?.setValue(this.selectedAutocompleteOption || '');
    this.abstractControlToSubscribe = this.abstractControl;

    this.filteredAutocompleteOptions = this.abstractControlToSubscribe?.valueChanges.pipe(
      startWith(''),
      map((value: string | DynamicFormControlAutocompleteOption) => typeof value === 'string' ? value : value.label),
      map((label: string) => label
        ? this.filterAutocompleteOptionsByLabel(label)
        : this.control.autocompleteOptions.slice())
    );
  }
}
