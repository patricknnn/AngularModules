import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CoreModule } from './modules/core/core.module';
import { FormComponent } from './components/form/form.component';
import { SharedModule } from './modules/shared/shared.module';
import { TableComponent } from './components/table/table.component';
import { DynamicFormsModule } from './modules/dynamic-forms/dynamic-forms.module';
import { DynamicTablesModule } from './modules/dynamic-tables/dynamic-tables.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    FormComponent,
    TableComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    DynamicFormsModule,
    DynamicTablesModule,
    FileUploadModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
