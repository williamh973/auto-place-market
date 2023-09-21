import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-feat-contact-popup',
  templateUrl: './feat-contact-popup.component.html',
  styleUrls: ['./feat-contact-popup.component.scss']
})
export class FeatContactPopupComponent {

  @Input() isAdminMode!: boolean;
  @Input() selectedUser!: User; 

  @Output() onCloseContactPopupFormEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  message: Message = new Message('', new Date(), new User('', '', '', '', false, [], [], [], 'ROLE_USER'), new User('', '', '', '', false, [], [], [], 'ROLE_USER'));

  isContactPopupFormOpen: boolean = false;
  isLoadingComposantActive: boolean = false;


  constructor(private messageService: MessageService) {}


  ngOnInit() {
    
  }

  onCancelContactPopupForm() {
    this.onCloseContactPopupFormEmit.emit(this.isContactPopupFormOpen); 
  }


  onSubmitMessage() {
    if (this.isAdminMode) {
      this.isLoadingComposantActive = true;

      const createMessageObservable = this.messageService.createAdminMessage(this.message, this.selectedUser);
      createMessageObservable.subscribe(
        (createdMessage) => {
          console.log(`Message de ${this.message.user.firstname} envoyé avec succès à ${this.message.receiver.firstname}`, createdMessage);
          this.isLoadingComposantActive = false;
    
          this.onCloseContactPopupFormEmit.emit(false);
        },
        (error) => {
          console.error('Erreur lors de la création du message', error);
          this.isLoadingComposantActive = false;
        }
      );
    } else {
      this.isLoadingComposantActive = true;
      this.message.receiver = this.selectedUser;
      
      const createMessageObservable = this.messageService.createUserMessage(this.message);
      createMessageObservable.subscribe(
        (createdMessage) => {
          console.log('Message créé avec succès', createdMessage);
          this.isLoadingComposantActive = false;
      
          this.onCloseContactPopupFormEmit.emit(false);
        },
        (error) => {
          console.error('Erreur lors de la création du message', error);
          this.isLoadingComposantActive = false;
        }
      );
     }
  }


}
