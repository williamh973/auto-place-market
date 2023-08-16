import { Component, EventEmitter, Output } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-feat-contact-popup',
  templateUrl: './feat-contact-popup.component.html',
  styleUrls: ['./feat-contact-popup.component.scss']
})
export class FeatContactPopupComponent {

  @Output() onCloseContactPopupFormEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  message: Message = new Message('', new Date(), new User('', '', '', '', [], [], [], 'ROLE_USER'));

  isContactPopupFormOpen: boolean = false;


constructor(private messageService: MessageService) {}



  onCancelContactPopupForm() {
    this.onCloseContactPopupFormEmit.emit(this.isContactPopupFormOpen); 
  }

  onSubmitMessage() {
    this.messageService.createMessage(this.message).subscribe((createdMessage) => {
      () => {
        console.log("Message envoyé avec succès !");
      };
      () => {
        console.error("Une erreur s'est produite lors de l'envoi du message :");
      }
    });
  }

}
