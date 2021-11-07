import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { MatCardModule } from '@angular/material/card';
import { CoreModule } from '../core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    NotificationComponent, 
    SnackbarComponent, 
    DialogComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  exports: [
    NotificationComponent,
  ],
})
export class DialogModule {}
