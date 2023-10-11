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
  @Input() user!: User; 
  @Input() receiver!: User; 

  @Output() onCloseContactPopupFormEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  message: Message = new Message(
    '', 
    new Date(), 
    new User('', '', '', '', false, [], [], [], "ROLE_USER" || "ROLE_ADMIN"), 
    new User('', '', '', '', false, [], [], [], "ROLE_USER" || "ROLE_ADMIN")
  );

  isContactPopupFormOpen: boolean = false;
  isLoadingComposantActive: boolean = false;


  constructor(private messageService: MessageService) {}


  ngOnInit() {
    console.log("Expéditeur", this.user);
    console.log("Destinataire", this.receiver);
  }

  onCancelContactPopupForm() {
    this.onCloseContactPopupFormEmit.emit(this.isContactPopupFormOpen); 
  }


  onSubmitMessage() {
    if (this.isAdminMode) {
      this.isLoadingComposantActive = true;

      console.log(this.message, this.user, this.receiver);
      
      const createMessageObservable = this.messageService.createAdminMessage(this.message, this.user, this.receiver);
      createMessageObservable.subscribe(
        (createdMessage) => {
          console.log(`Message de ${this.user.firstname} envoyé avec succès à ${this.receiver.firstname}`, createdMessage);
          this.isLoadingComposantActive = false;
    
          this.onCloseContactPopupFormEmit.emit(this.isContactPopupFormOpen);
        },
        (error) => {
          console.error('Erreur lors de la création du message', error);
          this.isLoadingComposantActive = false;
        }
      );
    } else {
      this.isLoadingComposantActive = true;
      this.message.receiver = this.receiver;
      
      const createMessageObservable = this.messageService.createUserMessage(this.message);
      createMessageObservable.subscribe(
        (createdMessage) => {
          console.log('Message créé avec succès', createdMessage);
          this.isLoadingComposantActive = false;
      
          this.onCloseContactPopupFormEmit.emit(this.isContactPopupFormOpen);
        },
        (error) => {
          console.error('Erreur lors de la création du message', error);
          this.isLoadingComposantActive = false;
        }
      );
     }
  }


}
