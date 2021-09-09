import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CoreModule } from './modules/core/core.module';
import { FormComponent } from './components/form/form.component';
import { CoreComponent } from './components/core/core.component';
import { MaterialComponent } from './components/material/material.component';
import { SharedModule } from './modules/shared/shared.module';
import { SharedComponent } from './components/shared/shared.component';
import { TableComponent } from './components/table/table.component';
import { DynamicFormsModule } from './modules/dynamic-forms/dynamic-forms.module';
import { DynamicTablesModule } from './modules/dynamic-tables/dynamic-tables.module';
import { DynamicFormsTdModule } from './modules/dynamic-forms-td/dynamic-forms-td.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    FormComponent,
    CoreComponent,
    MaterialComponent,
    SharedComponent,
    TableComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    DynamicFormsModule,
    DynamicFormsTdModule,
    DynamicTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
