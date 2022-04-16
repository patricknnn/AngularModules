import { NgModule } from '@angular/core';
import { NotificationComponent } from './components/notification/notification.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NotificationComponent, SnackbarComponent, DialogComponent],
  imports: [SharedModule],
  exports: [NotificationComponent],
})
export class DialogModule {}
