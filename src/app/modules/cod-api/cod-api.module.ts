import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CodApiDashboardComponent } from './components/cod-api-dashboard/cod-api-dashboard.component';

@NgModule({
  declarations: [
    CodApiDashboardComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CodApiDashboardComponent
  ]
})
export class CodApiModule { }
