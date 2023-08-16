import { Component } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';

@Component({
  selector: 'app-feat-message-user',
  templateUrl: './feat-message-user.component.html',
  styleUrls: ['./feat-message-user.component.scss']
})
export class FeatMessageUserComponent {

  message: Message = new Message('', new Date(), new User('', '', '', '', [], [], [], 'ROLE_USER'));

  messageListCreatedByUser: Message[] = [];


  constructor(private dbUser: DbUserService) {}


  ngOnInit() {
    this.dbUser.getUserMessages().subscribe((messageListFromDatabase: Message[]) => {
      this.messageListCreatedByUser = messageListFromDatabase
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      });   
  }

  onExpandMessage(message: Message) {
    message.isExpanded = !message.isExpanded;
}
}
