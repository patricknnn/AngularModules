import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneChangeEvent, NgxDropzoneComponent } from 'ngx-dropzone';
import { NgxDropzoneService } from 'ngx-dropzone/lib/ngx-dropzone.service';
import { createSpyHttpClient } from 'projects/core-ui/spies/spyHttpClient';
import { createSpyNgxDropzoneService } from 'projects/core-ui/spies/spyNgxDropzoneService';
import { FileUploadType } from './enums/file-upload-type';
import { FileUploadComponent } from './file-upload.component';

const fakeImage: File = new File([''], 'image', { type: 'image/png' });
const fakeVideo: File = new File([''], 'video', { type: 'video/mp4' });
const fakePdf: File = new File([''], 'pdf', { type: 'application/pdf' });
const spyNgxDropzoneService: jasmine.SpyObj<NgxDropzoneService> = createSpyNgxDropzoneService();
const fakeChangeEvent: NgxDropzoneChangeEvent = {
  source: new NgxDropzoneComponent(spyNgxDropzoneService),
  addedFiles: [fakeImage, fakeVideo, fakePdf],
  rejectedFiles: [fakeImage],
};

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let spyHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    spyHttpClient = createSpyHttpClient();

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: HttpClient, useValue: spyHttpClient },
        { provide: DomSanitizer, useValue: spyHttpClient },
      ],
      declarations: [
        FileUploadComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('using onFileSelect', () => {
    beforeEach(() => {
      spyOn(component.filesChange, 'emit');
      component.onFileSelect(fakeChangeEvent);
    });

    it('should add selected files to _files array', () => {
      expect(component.files.length).toEqual(3);
    });

    it('should add rejected files to rejectedFiles array', () => {
      expect(component.rejectedFiles.length).toEqual(1);
    });

    it('should emit files array', () => {
      expect(component.filesChange.emit).toHaveBeenCalled();
    });
  });

  describe('using onFileRemove', () => {
    beforeEach(() => {
      spyOn(component.filesChange, 'emit');
      component.onFileSelect(fakeChangeEvent);
    });

    it('should remove file from _files array', () => {
      component.onFileRemove(fakeImage);

      expect(component.files.length).toEqual(2);
    });

    it('should empty rejectedFiles array', () => {
      component.onFileRemove(fakeImage);

      expect(component.rejectedFiles.length).toEqual(0);
    });

    it('should emit files array', () => {
      expect(component.filesChange.emit).toHaveBeenCalled();
    });
  });

  describe('using onFileDownload', () => {
    it('should download the file', () => {
      const spyObj: any = jasmine.createSpyObj('a', ['click', 'remove']);
      spyOn(document, 'createElement').and.returnValue(spyObj);

      component.onFileDownload(fakeImage);

      expect(document.createElement).toHaveBeenCalledTimes(1);
      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(spyObj.download).toBe(fakeImage.name);
      expect(spyObj.click).toHaveBeenCalledTimes(1);
      expect(spyObj.remove).toHaveBeenCalledTimes(1);
    });
  });

  describe('using getFileUploadType', () => {
    it(`should return ${FileUploadType.IMAGE}`, () => {
      expect(component.getFileUploadType(fakeImage)).toEqual(FileUploadType.IMAGE);
    });

    it(`should return ${FileUploadType.VIDEO}`, () => {
      expect(component.getFileUploadType(fakeVideo)).toEqual(FileUploadType.VIDEO);
    });

    it(`should return ${FileUploadType.GENERAL}`, () => {
      expect(component.getFileUploadType(fakePdf)).toEqual(FileUploadType.GENERAL);
    });
  });
});
