import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { SnackBarConfig } from '../../models/snackbar-config';
import { SnackbarData } from '../../models/snackbar-data';

@Injectable()
export class SnackbarService {
  public constructor(private readonly _snackBar: MatSnackBar) {}

  public openSnackBar(config: SnackBarConfig): void {
    const snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig<SnackbarData>();

    snackBarConfig.horizontalPosition = config.horizontalPosition;
    snackBarConfig.verticalPosition = config.verticalPosition;
    snackBarConfig.duration = this.getDurationInMs(config);
    snackBarConfig.data = {
      text: config.text,
      type: config.type,
      dismissable: config.dismissable,
      preClose: (): MatSnackBarRef<SnackbarComponent> => this._snackBar.openFromComponent(SnackbarComponent, snackBarConfig),
    };
  }

  private getDurationInMs(config: SnackBarConfig): number | undefined {
    return config.dismissable ? undefined : config.durationInSeconds * 1000;
  }
}
