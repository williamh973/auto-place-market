import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Notification } from 'src/app/models/notification.model';

@Component({
  selector: 'app-feat-confirm-delete-notification',
  templateUrl: './feat-confirm-delete-notification.component.html',
  styleUrls: ['./feat-confirm-delete-notification.component.scss']
})
export class FeatConfirmDeleteNotificationComponent {

  @Input() notificationListReceived!: Notification[];
  @Input() selectedNotification!: Notification

  @Output() onForCloseConfirmDeleteNotificationPopup: EventEmitter<boolean> = new EventEmitter<boolean>();

  isConfirmDeleteNotificationPopupOpen: boolean = false;


  constructor(private notificationService: NotificationService) {}


  onDeleteNotification() {  
    if (this.selectedNotification) {
      this.notificationService.deleteNotification(this.selectedNotification.id as number).subscribe(() => {
        const index = this.notificationListReceived.indexOf(this.selectedNotification);
        if (index !== -1) {
          this.notificationListReceived.splice(index, 1);
        }
            this.isConfirmDeleteNotificationPopupOpen = false;
            this.onForCloseConfirmDeleteNotificationPopup.emit(this.isConfirmDeleteNotificationPopupOpen);
      });
    }

};

  onCancelConfirmationPopup() {
    this.isConfirmDeleteNotificationPopupOpen = false;
    this.onForCloseConfirmDeleteNotificationPopup.emit(this.isConfirmDeleteNotificationPopupOpen);
   }


}
