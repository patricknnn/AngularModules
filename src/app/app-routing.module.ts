import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './components/core/core.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SharedComponent } from './components/shared/shared.component';
import { TableComponent } from './components/table/table.component';
import { CodApiDashboardComponent } from './modules/cod-api/components/cod-api-dashboard/cod-api-dashboard.component';

const routes: Routes = [
  // Paths
  { path: 'home', component: HomeComponent },
  { path: 'core', component: CoreComponent },
  { path: 'shared', component: SharedComponent },
  { path: 'forms', component: FormComponent },
  { path: 'tables', component: TableComponent },
  { path: 'codapi', component: CodApiDashboardComponent },
  { path: '404', component: PageNotFoundComponent },
  // Redirects
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
