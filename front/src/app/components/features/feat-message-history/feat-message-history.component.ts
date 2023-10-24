import { Component, Input } from '@angular/core';
import { HistoricMessage } from 'src/app/models/historic-message.model';
import { User } from 'src/app/models/user.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { HistoricMessageService } from 'src/app/shared/services/historic-message.service';


@Component({
  selector: 'app-feat-message-history',
  templateUrl: './feat-message-history.component.html',
  styleUrls: ['./feat-message-history.component.scss']
})
export class FeatMessageHistoryComponent {

  @Input() user!: User

  historicMessage: HistoricMessage = new HistoricMessage(
    '', 
    new Date(), 
    new User('', '', '', '', false, [], [], [], [], [], "ROLE_USER" || "ROLE_ADMIN")
  );

  messageListCreatedByUser: HistoricMessage[] = [];

  isConfirmDeleteMessagePopupOpen: boolean = false;


  constructor(
    private dbUser: DbUserService, 
    private historicMessageService: HistoricMessageService
    ) {}


  ngOnInit() {
    if (this.user.id) {
      this.dbUser.getUserHistoricMessagesList().subscribe((messageListFromDatabase: HistoricMessage[]) => {
        this.messageListCreatedByUser = messageListFromDatabase
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        console.log(this.messageListCreatedByUser);
      });  
    }
  } 

  onExpandMessage(historicMessage: HistoricMessage) {
    historicMessage.isExpanded = !historicMessage.isExpanded;
  }

  onCancelBtn(historicMessage: HistoricMessage) {
    this.historicMessageService.deleteMessage(historicMessage.id as number).subscribe(() => {
     const index = this.messageListCreatedByUser.findIndex(p => p.id === historicMessage.id);
      if (index !== -1) {
        this.messageListCreatedByUser.splice(index, 1);
      }
    })
  };

  onForCloseConfirmDeletePopup(isConfirmDeleteMessagePopupOpen: boolean) {
   this.isConfirmDeleteMessagePopupOpen = !this.isConfirmDeleteMessagePopupOpen
  }

}
