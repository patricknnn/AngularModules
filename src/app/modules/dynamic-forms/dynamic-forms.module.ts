import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormControlComponent } from './components/dynamic-form-control/dynamic-form-control.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '../shared/shared.module';
import { DynamicFormControlTextComponent } from './components/dynamic-form-control-text/dynamic-form-control-text.component';
import { DynamicFormControlTextareaComponent } from './components/dynamic-form-control-textarea/dynamic-form-control-textarea.component';
import { DynamicFormControlSelectComponent } from './components/dynamic-form-control-select/dynamic-form-control-select.component';
import { DynamicFormControlDateComponent } from './components/dynamic-form-control-date/dynamic-form-control-date.component';
import { DynamicFormControlDateOfBirthComponent } from './components/dynamic-form-control-date-of-birth/dynamic-form-control-date-of-birth.component';
import { DynamicFormControlDateRangeComponent } from './components/dynamic-form-control-date-range/dynamic-form-control-date-range.component';
import { DynamicFormControlAutocompleteComponent } from './components/dynamic-form-control-autocomplete/dynamic-form-control-autocomplete.component';
import { DynamicFormControlChipsComponent } from './components/dynamic-form-control-chips/dynamic-form-control-chips.component';
import { DynamicFormControlRadioComponent } from './components/dynamic-form-control-radio/dynamic-form-control-radio.component';
import { DynamicFormControlCheckboxComponent } from './components/dynamic-form-control-checkbox/dynamic-form-control-checkbox.component';
import { DynamicFormControlSlideComponent } from './components/dynamic-form-control-slide/dynamic-form-control-slide.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormControlComponent,
    DynamicFormControlTextComponent,
    DynamicFormControlTextareaComponent,
    DynamicFormControlSelectComponent,
    DynamicFormControlDateComponent,
    DynamicFormControlDateOfBirthComponent,
    DynamicFormControlDateRangeComponent,
    DynamicFormControlAutocompleteComponent,
    DynamicFormControlChipsComponent,
    DynamicFormControlRadioComponent,
    DynamicFormControlCheckboxComponent,
    DynamicFormControlSlideComponent,
  ],
  imports: [SharedModule],
  exports: [DynamicFormComponent],
  providers: [MatDatepickerModule],
})
export class DynamicFormsModule { }
