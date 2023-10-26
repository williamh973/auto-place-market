import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReceivedMessage } from 'src/app/models/received-message.model';
import { ReceivedMessageService } from 'src/app/shared/services/received-message.service';


@Component({
  selector: 'app-feat-confirm-delete-message',
  templateUrl: './feat-confirm-delete-message.component.html',
  styleUrls: ['./feat-confirm-delete-message.component.scss']
})
export class FeatConfirmDeleteMessageComponent {

  @Input() messageListReceived!: ReceivedMessage[];
  @Input() selectedMessage!: ReceivedMessage
  
  @Output() onForCloseConfirmDeleteMessagePopup: EventEmitter<boolean> = new EventEmitter<boolean>();

  isConfirmDeleteMessagePopupOpen: boolean = false;


  constructor(private receivedMessageService: ReceivedMessageService) {}
    

    onDeleteMessage() {
      if (this.selectedMessage) {
        this.receivedMessageService.deleteMessage(this.selectedMessage.id as number).subscribe(() => {
          const index = this.messageListReceived.findIndex(p => p.id === this.selectedMessage.id);
             if (index !== -1) {
               this.messageListReceived.splice(index, 1);
             }
                this.isConfirmDeleteMessagePopupOpen = false;
                this.onForCloseConfirmDeleteMessagePopup.emit(this.isConfirmDeleteMessagePopupOpen);
          })    
      }
    }

    onCancelConfirmationPopup() {
     this.isConfirmDeleteMessagePopupOpen = false;
     this.onForCloseConfirmDeleteMessagePopup.emit(this.isConfirmDeleteMessagePopupOpen);
    }

    
  
}
