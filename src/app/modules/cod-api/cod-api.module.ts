import { NgModule } from '@angular/core';
import { CodApiLoginComponent } from './components/cod-api-login/cod-api-login.component';
import { SharedModule } from '../shared/shared.module';
import { CodApiDashboardComponent } from './components/cod-api-dashboard/cod-api-dashboard.component';
import { CodApiContentComponent } from './components/cod-api-content/cod-api-content.component';

@NgModule({
  declarations: [
    CodApiLoginComponent,
    CodApiDashboardComponent,
    CodApiContentComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CodApiDashboardComponent
  ]
})
export class CodApiModule { }
