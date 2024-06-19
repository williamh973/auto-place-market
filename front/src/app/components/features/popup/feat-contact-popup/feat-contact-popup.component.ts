import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-feat-contact-popup',
  templateUrl: './feat-contact-popup.component.html',
  styleUrls: ['./feat-contact-popup.component.scss'],
})
export class FeatContactPopupComponent {
  @Input() isAdminMod!: boolean;
  @Input() selectedUser!: User;
  @Input() user!: User;

  @Output() onCloseContactPopupFormEmit: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  message: Message = new Message('', new Date(), this.user, this.selectedUser);

  isContactPopupFormOpen: boolean = false;
  isLoadingComposantActive: boolean = false;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    console.log('Expéditeur', this.user);
    console.log('Destinataire', this.selectedUser);
  }

  onCancelContactPopupForm() {
    this.onCloseContactPopupFormEmit.emit(this.isContactPopupFormOpen);
  }

  onSubmitMessage() {
    if (this.isAdminMod) {
      this.isLoadingComposantActive = true;

      const createMessageObservable = this.messageService.createAdminMessage(
        this.message,
        this.user,
        this.selectedUser
      );
      createMessageObservable.subscribe(
        (createdMessage) => {
          console.log(
            `Message de ${this.user.firstname} envoyé avec succès à ${this.selectedUser.firstname}`,
            createdMessage
          );
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

      const createMessageObservable = this.messageService.createUserMessage(
        this.message
      );
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
