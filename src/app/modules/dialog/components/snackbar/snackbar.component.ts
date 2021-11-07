import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarData } from '../../models/snackbar-data';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  public constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) {}

  public dismiss(): void {
    this.data.preClose();
  }
}
