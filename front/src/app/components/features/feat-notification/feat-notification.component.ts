import { Component, EventEmitter, Output } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Notification } from 'src/app/models/notification.model';

@Component({
  selector: 'app-feat-notification',
  templateUrl: './feat-notification.component.html',
  styleUrls: ['./feat-notification.component.scss']
})
export class FeatNotificationComponent {

  notificationListReceived: Notification[] = [];


  constructor(
    private notificationService: NotificationService,
    ) {}


  ngOnInit() {  
    this.notificationService.getAllNotifications().subscribe((notificationFromDataBase: Notification[]) => {
      this.notificationListReceived = notificationFromDataBase
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }); 
  } 

  onExpandNotification(notification: Notification) {
    notification.isExpanded = !notification.isExpanded;
  }

  onCancelNotification(notification: Notification) {
    this.notificationService.deleteNotification(notification.id as number).subscribe(() => {
    const index = this.notificationListReceived.findIndex(p => p.id === notification.id);
       if (index !== -1) {
         this.notificationListReceived.splice(index, 1);
       }
    })
  };

}
