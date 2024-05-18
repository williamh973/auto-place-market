import { Component } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-feat-message-history',
  templateUrl: './feat-message-history.component.html',
  styleUrls: ['./feat-message-history.component.scss']
})
export class FeatMessageHistoryComponent {

  message: Message = new Message('', new Date(), new User('', '', '', '', false, [], [], [], 'ROLE_USER'), new User('', '', '', '', false, [], [], [], 'ROLE_USER'));

  messageListCreatedByUser: Message[] = [];

  isConfirmDeleteMessagePopupOpen: boolean = false;


  constructor(
    private dbUser: DbUserService,
    private messageService: MessageService
    ) {}


  ngOnInit() {
    this.dbUser.getUserMessages().subscribe((messageListFromDatabase: Message[]) => {
      this.messageListCreatedByUser = messageListFromDatabase
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      console.log(this.messageListCreatedByUser);
    });  
      
  } 

  onExpandMessage(message: Message) {
    message.isExpanded = !message.isExpanded;
  }

  onCancelBtn(message: Message) {
    this.messageService.deleteMessage(message.id as number).subscribe(() => {
      const index = this.messageListCreatedByUser.findIndex(p => p.id === message.id);
          if (index !== -1) {
            this.messageListCreatedByUser.splice(index, 1);
          }
        })
      };
  // onCancelBtn() {
  //   this.isConfirmDeleteMessagePopupOpen = !this.isConfirmDeleteMessagePopupOpen
  // }

  onForCloseConfirmDeletePopup(isConfirmDeleteMessagePopupOpen: boolean) {
   this.isConfirmDeleteMessagePopupOpen = !this.isConfirmDeleteMessagePopupOpen
  }

  

}
