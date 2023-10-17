import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReceivedMessage } from 'src/app/models/received-message.model';
import { User } from 'src/app/models/user.model';
import { HistoricMessageService } from 'src/app/shared/services/historic-message.service';
import { ReceivedMessageService } from 'src/app/shared/services/received-message.service';

@Component({
  selector: 'app-feat-contact-popup',
  templateUrl: './feat-contact-popup.component.html',
  styleUrls: ['./feat-contact-popup.component.scss']
})
export class FeatContactPopupComponent {

  @Input() user!: User; 
  @Input() receiver!: User; 
  @Input() role!: "ROLE_USER" | "ROLE_ADMIN";
  
  @Input() isUserFetchedSelected!: boolean;
 
  @Output() onCloseContactPopupFormEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  receivedMessage: ReceivedMessage = new ReceivedMessage(
    '', 
    new Date(), 
    new User('', '', '', '', false, [], [], [], [], "ROLE_USER" || "ROLE_ADMIN"), 
    new User('', '', '', '', false, [], [], [], [], "ROLE_USER" || "ROLE_ADMIN")
  );

  isContactPopupFormOpen: boolean = false;
  isLoadingComposantActive: boolean = false;


  constructor(
    private receivedMessageService: ReceivedMessageService,
    private historicMessageService: HistoricMessageService
    ) {}


  ngOnInit() {
   
  }

  
  private createAdminMessageCopy() {
    const createHistoricMessageObservable = this.historicMessageService.createAdminMessageCopy(this.receivedMessage, this.user);
    createHistoricMessageObservable.subscribe(
      (createdCopyMessage) => {
        console.log(`Message envoyé avec succès à ${this.user.firstname}`, createdCopyMessage);
        this.isLoadingComposantActive = false;
  
        this.onCloseContactPopupFormEmit.emit(this.isContactPopupFormOpen);
      },
      (error) => {
        console.error('Erreur lors de la création du message', error);
        this.isLoadingComposantActive = false;
      }
      );
    }
    

  onSubmitMessage() { 
    if (this.role === 'ROLE_ADMIN' && this.isUserFetchedSelected) {
      this.isLoadingComposantActive = true;
      
      const createMessageObservable = this.receivedMessageService.createAdminMessage(this.receivedMessage, this.user, this.receiver);
      createMessageObservable.subscribe(
        (createdMessage) => {
          console.log(`Message envoyé avec succès à ${this.receiver.firstname}`, createdMessage);
          this.isLoadingComposantActive = false;
          
          this.onCloseContactPopupFormEmit.emit(this.isContactPopupFormOpen);
        },
        (error) => {
          console.error('Erreur lors de la création du message', error);
          this.isLoadingComposantActive = false;
        }
      );

      this.createAdminMessageCopy()
    
    } else {
      console.log("notification");
      
      // this.isLoadingComposantActive = true;
      // this.receivedMessage.receiver = this.receiver;
      
      // const createMessageObservable = this.receivedMessageService.createUserMessage(this.receivedMessage);
      // createMessageObservable.subscribe(
      //   (createdMessage) => {
      //     console.log('Message créé avec succès', createdMessage);
      //     this.isLoadingComposantActive = false;
          
      //     this.onCloseContactPopupFormEmit.emit(this.isContactPopupFormOpen);
      //   },
      //   (error) => {
      //     console.error('Erreur lors de la création du message', error);
      //     this.isLoadingComposantActive = false;
      //   }
      // );
     }
  }
  
  
  onCancelContactPopupForm() {
    this.onCloseContactPopupFormEmit.emit(this.isContactPopupFormOpen); 
  }
}
