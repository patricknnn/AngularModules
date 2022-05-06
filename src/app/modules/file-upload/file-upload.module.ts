import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    SharedModule,
  ],
  exports: [
    FileUploadComponent,
  ],
})
export class FileUploadModule { }
