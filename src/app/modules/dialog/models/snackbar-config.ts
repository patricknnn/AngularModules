import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export class SnackBarConfig {
  public constructor(
    public text: string = '',
    public type: 'succes' | 'info' | 'warn' = 'succes',
    public dismissable: boolean = true,
    public durationInSeconds: number = 5,
    public horizontalPosition: MatSnackBarHorizontalPosition = 'center',
    public verticalPosition: MatSnackBarVerticalPosition = 'bottom',
  ) {}
}
