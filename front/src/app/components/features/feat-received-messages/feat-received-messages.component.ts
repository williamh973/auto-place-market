import { Component, Input } from '@angular/core';
import { ReceivedMessage } from 'src/app/models/received-message.model';
import { User } from 'src/app/models/user.model';
import { Notification } from 'src/app/models/notification.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { ReceivedMessageService } from 'src/app/shared/services/received-message.service';

@Component({
  selector: 'app-feat-received-messages',
  templateUrl: './feat-received-messages.component.html',
  styleUrls: ['./feat-received-messages.component.scss']
})
export class FeatReceivedMessagesComponent {

  @Input() user!: User
  @Input() role!: "ROLE_USER" | "ROLE_ADMIN";

 
  userDataForReplyTo!: User

  messageListReceived: ReceivedMessage[] = [];
  notificationListReceived: Notification[] = [];

  isConfirmDeleteMessagePopupOpen: boolean = false;
  isContactPopupFormOpen: boolean = false;
  isReplyMode: boolean = false;


  constructor(
    private receivedMessageService: ReceivedMessageService,
    private dbUser: DbUserService,
    ) {}


  ngOnInit() {  
    if (this.user.id) {
      this.dbUser.getUserReceivedMessagesList(this.user.id).subscribe((messageListReceivedFromDataBase: ReceivedMessage[]) => {
        this.messageListReceived = messageListReceivedFromDataBase
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      });
    }
    
  } 
  

  onExpandMessage(receivedMessage: ReceivedMessage) {
    receivedMessage.isExpanded = !receivedMessage.isExpanded;
  }



  onCancelBtn(receivedMessage: ReceivedMessage) {
    this.receivedMessageService.deleteMessage(receivedMessage.id as number).subscribe(() => {
    const index = this.messageListReceived.findIndex(p => p.id === receivedMessage.id);
       if (index !== -1) {
         this.messageListReceived.splice(index, 1);
       }
    })
  };

  

  onForCloseConfirmDeletePopup(isConfirmDeleteMessagePopupOpen: boolean) {
   this.isConfirmDeleteMessagePopupOpen = !this.isConfirmDeleteMessagePopupOpen
  }

  onContactFormOpenForSendMessage() {
    this.isContactPopupFormOpen = !this.isContactPopupFormOpen;
  }
  
  onRecevedMethodForCloseContactForm(isContactPopupFormOpen: boolean) {
    this.isContactPopupFormOpen = isContactPopupFormOpen;
  }

  onReplyToMessage(receivedMessage: ReceivedMessage) {
    const userForReply = receivedMessage.user;
    this.userDataForReplyTo = userForReply
    this.isReplyMode = true; 
    this.isContactPopupFormOpen = !this.isContactPopupFormOpen;
  }


  
}
