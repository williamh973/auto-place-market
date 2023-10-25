import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-feat-message-dashboard',
  templateUrl: './feat-message-dashboard.component.html',
  styleUrls: ['./feat-message-dashboard.component.scss']
})
export class FeatMessageDashboardComponent {

  @Input() user!: User
  @Input() role!: "ROLE_USER" | "ROLE_ADMIN";
  
  isReceivedMessageListOpen: boolean = false;
  isReceivedNotificationListOpen: boolean = false;
  isMessageButtonSelected: boolean = false;
  isNotificationButtonSelected: boolean = false;   

  
  onOpenReceivedMessageList() {
    this.isMessageButtonSelected = !this.isMessageButtonSelected;
    this.isReceivedMessageListOpen = !this.isReceivedMessageListOpen
  }

  onOpenReceivedNotificationList() {
    this.isNotificationButtonSelected = !this.isNotificationButtonSelected;
    this.isReceivedNotificationListOpen = !this.isReceivedNotificationListOpen
  }

}
