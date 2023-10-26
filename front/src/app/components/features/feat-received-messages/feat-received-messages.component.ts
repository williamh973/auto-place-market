import { Component, Input } from '@angular/core';
import { ReceivedMessage } from 'src/app/models/received-message.model';
import { User } from 'src/app/models/user.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';

@Component({
  selector: 'app-feat-received-messages',
  templateUrl: './feat-received-messages.component.html',
  styleUrls: ['./feat-received-messages.component.scss']
})
export class FeatReceivedMessagesComponent {

  @Input() user!: User
  @Input() role!: "ROLE_USER" | "ROLE_ADMIN";

  userDataForReplyTo!: User
  selectedMessage!: ReceivedMessage
  
  messageListReceived: ReceivedMessage[] = [];
  
  isConfirmDeleteMessagePopupOpen: boolean = false;
  isMessageDeleted: boolean = false;
  isContactPopupFormOpen: boolean = false;
  isReplyMode: boolean = false;


  constructor(private dbUser: DbUserService) {}


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


  onDeleteMessage(receivedMessage: ReceivedMessage) {
    this.isConfirmDeleteMessagePopupOpen = !this.isConfirmDeleteMessagePopupOpen
    this.selectedMessage = receivedMessage
  };


  onForCloseConfirmDeletePopup(isConfirmDeleteMessagePopupOpen: boolean) {
   this.isConfirmDeleteMessagePopupOpen = isConfirmDeleteMessagePopupOpen
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
