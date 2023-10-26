import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Notification } from 'src/app/models/notification.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-feat-notification',
  templateUrl: './feat-notification.component.html',
  styleUrls: ['./feat-notification.component.scss']
})
export class FeatNotificationComponent {

  @Input() user!: User

  notificationListReceived: Notification[] = [];

  isConfirmDeleteNotificationPopupOpen: boolean = false;

  selectedNotification!: Notification


  constructor(private notificationService: NotificationService) {}


  ngOnInit() {  
    this.notificationService.getAllNotifications().subscribe((notificationFromDataBase: Notification[]) => {
      this.notificationListReceived = notificationFromDataBase
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }); 
  } 

  onExpandNotification(notification: Notification) {
    notification.isExpanded = !notification.isExpanded;
  }

  onForCloseConfirmDeletePopup(isConfirmDeleteNotificationPopupOpen: boolean) {
    this.isConfirmDeleteNotificationPopupOpen = isConfirmDeleteNotificationPopupOpen
   }

   onDeleteNotification(notification: Notification) {
    this.isConfirmDeleteNotificationPopupOpen = !this.isConfirmDeleteNotificationPopupOpen
    this.selectedNotification = notification
  };

}
