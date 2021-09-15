import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  // Paths
  { path: 'home', component: HomeComponent },
  { path: 'forms', component: FormComponent },
  { path: 'tables', component: TableComponent },
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
