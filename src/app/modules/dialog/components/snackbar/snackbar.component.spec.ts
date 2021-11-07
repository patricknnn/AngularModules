import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarData } from '../../models/snackbar-data';

import { SnackbarComponent } from './snackbar.component';

describe('SnackbarComponent', () => {
  const data: SnackbarData = {
    text: 'test',
    type: 'succes',
    dismissable: false,
    preClose: null,
  };
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SnackbarComponent],
      providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: data }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
