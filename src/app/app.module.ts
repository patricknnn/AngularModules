import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CoreModule } from './modules/core/core.module';
import { DynamicFormsModule } from './modules/dynamic-forms/dynamic-forms.module';
import { MaterialModule } from './modules/material/material.module';
import { FormComponent } from './components/form/form.component';
import { CoreComponent } from './components/core/core.component';
import { MaterialComponent } from './components/material/material.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    FormComponent,
    CoreComponent,
    MaterialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    CoreModule,
    ReactiveFormsModule,
    DynamicFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
