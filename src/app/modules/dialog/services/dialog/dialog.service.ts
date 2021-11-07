import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { DialogData } from '../../models/dialog-data';

@Injectable()
export class DialogService {
  public constructor(public dialog: MatDialog) {}

  public openSimpleDialog(data: DialogData): MatDialogRef<DialogComponent> {
    const config: MatDialogConfig = {
      data: data,
    };

    return this.openComponentDialog(DialogComponent, config);
  }

  public openComponentDialog(
    component: ComponentType<any>,
    config?: MatDialogConfig,
  ): MatDialogRef<any> {
    
    return this.dialog.open(component, config);
  }
}
