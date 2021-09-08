import { NgModule } from '@angular/core';
import { DynamicTableComponent } from './dynamic-table.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DynamicTableComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DynamicTableComponent
  ],
})
export class DynamicTablesModule {}
