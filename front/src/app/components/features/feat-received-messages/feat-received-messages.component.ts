import { Component, Input } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-feat-received-messages',
  templateUrl: './feat-received-messages.component.html',
  styleUrls: ['./feat-received-messages.component.scss']
})
export class FeatReceivedMessagesComponent {

  @Input() user!: User

  message: Message = new Message('', new Date(), new User('', '', '', '', false, [], [], [], 'ROLE_USER'), new User('', '', '', '', false, [], [], [], 'ROLE_USER'));

  messageListReceived: Message[] = [];

  isConfirmDeleteMessagePopupOpen: boolean = false;


  constructor(
    private messageService: MessageService
    ) {}


  ngOnInit() {
    // this.messageService.getAllMessages().subscribe((messageListReceivedFromDataBase: Message[]) => {
    //   this.messageListReceived = messageListReceivedFromDataBase
    //   .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    // });

    if (this.user.id) {
      this.messageService.getMessagesForUser(this.user.id).subscribe((messageListReceivedFromDataBase: Message[]) => {
        this.messageListReceived = messageListReceivedFromDataBase
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        console.log(this.messageListReceived);    
      });
    }

  }
  

  onExpandMessage(message: Message) {
    message.isExpanded = !message.isExpanded;
  }

  onCancelBtn(message: Message) {
    this.messageService.deleteMessage(message.id as number).subscribe(() => {
      const index = this.messageListReceived.findIndex(p => p.id === message.id);
          if (index !== -1) {
            this.messageListReceived.splice(index, 1);
          }
        })
      };

  onForCloseConfirmDeletePopup(isConfirmDeleteMessagePopupOpen: boolean) {
   this.isConfirmDeleteMessagePopupOpen = !this.isConfirmDeleteMessagePopupOpen
  }

  
}
