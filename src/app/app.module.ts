import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CoreModule } from './modules/core/core.module';
import { DynamicFormsModule } from './modules/dynamic-forms/dynamic-forms.module';
import { FormComponent } from './components/form/form.component';
import { CoreComponent } from './components/core/core.component';
import { MaterialComponent } from './components/material/material.component';
import { SharedModule } from './modules/shared/shared.module';
import { SharedComponent } from './components/shared/shared.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    FormComponent,
    CoreComponent,
    MaterialComponent,
    SharedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    DynamicFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
