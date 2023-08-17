import { Component } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-feat-message-user',
  templateUrl: './feat-message-user.component.html',
  styleUrls: ['./feat-message-user.component.scss']
})
export class FeatMessageUserComponent {

  message: Message = new Message('', new Date(), new User('', '', '', '', [], [], [], 'ROLE_USER'));

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
