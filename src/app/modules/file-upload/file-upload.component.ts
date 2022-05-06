import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { FileUploadType } from './enums/file-upload-type';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  animations: [
    trigger('errorAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('150ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class FileUploadComponent {
  @Input() public required: boolean = true;
  @Input() public removable: boolean = true;
  @Input() public multiple: boolean = true;
  @Input() public disabled: boolean = false;
  @Input() public expandable: boolean = true;
  @Input() public maxFileSize: number = 1000000;
  @Input() public maxFileName: number = 15;
  @Input() public accept: string = 'image/jpeg,image/jpg,image/png,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  @Input() public label?: string;
  @Input() public dragDropLabel?: string;
  @Input() public rejectedMessage?: string;
  @Input() public files: File[] = [];

  @Output() public filesChange: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() public filesAdded: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() public fileRemoved: EventEmitter<File> = new EventEmitter<File>();

  public rejectedFiles: File[] = [];

  public readonly _fileUploadType: typeof FileUploadType = FileUploadType;

  public onFileSelect(event: NgxDropzoneChangeEvent): void {
    this.files.push(...event.addedFiles);
    this.rejectedFiles = event.rejectedFiles;
    this.checkAddedFileNames();
    this.filesAdded.emit(event.addedFiles);
    this.filesChange.emit(this.files);
  }

  public onFileRemove(file: File): void {
    this.files.splice(this.files.indexOf(file), 1);
    this.rejectedFiles = [];
    this.fileRemoved.emit(file);
    this.filesChange.emit(this.files);
  }

  public onFileDownload(file: File): void {
    const objectUrl: string = URL.createObjectURL(file);
    const element: HTMLAnchorElement = document.createElement('a');
    element.href = objectUrl;
    element.download = file.name;
    element.click();
    element.remove();
    URL.revokeObjectURL(objectUrl);
  }

  public getFileUploadType(file: File): FileUploadType {
    const fileType: string = file.type.substring(0, file.type.indexOf('/'));

    switch (fileType) {
      case 'image':
        return FileUploadType.IMAGE;
      case 'video':
        return FileUploadType.VIDEO;
      default:
        return FileUploadType.GENERAL;
    }
  }

  private checkAddedFileNames(): void {
    this.files.forEach((file: File, index: number) => {
      if (this.maxFileName && file.name.length > this.maxFileName) {
        this.files.splice(index, 1);
        this.rejectedFiles.push(file);
        this.rejectedMessage = 'file name too long';
      }
    });
  }
}
