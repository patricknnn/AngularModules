import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './components/core/core.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialComponent } from './components/material/material.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  // Paths
  { path: 'home', component: HomeComponent },
  { path: 'core', component: CoreComponent },
  { path: 'forms', component: FormComponent },
  { path: 'material', component: MaterialComponent },
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
