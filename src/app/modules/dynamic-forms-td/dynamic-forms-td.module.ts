import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DynamicFormTdComponent } from './components/dynamic-form-td/dynamic-form-td.component';

@NgModule({
  declarations: [DynamicFormTdComponent],
  imports: [SharedModule],
  exports: [DynamicFormTdComponent],
  providers: [MatDatepickerModule],
})
export class DynamicFormsTdModule {}
