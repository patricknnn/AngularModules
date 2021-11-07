import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() public text!: string;
  @Input() public type!: 'succes' | 'info' | 'warn';
  @Input() public dismissable!: boolean;

  @Output() public dismissEvent: EventEmitter<void> = new EventEmitter();

  public icon: string | undefined;

  public ngOnInit(): void {
    switch (this.type) {
      case 'succes':
        this.icon = 'check-circle';
        break;
      case 'info':
        this.icon = 'warning-circle';
        break;
      case 'warn':
        this.icon = 'x-circle';
        break;
      default:
        this.icon = undefined;
        break;
    }
  }

  public dismiss(): void {
    this.dismissEvent.emit();
  }
}
