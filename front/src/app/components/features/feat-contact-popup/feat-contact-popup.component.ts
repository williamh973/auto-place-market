import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReceivedMessage } from 'src/app/models/received-message.model';
import { Notification } from 'src/app/models/notification.model';
import { User } from 'src/app/models/user.model';
import { HistoricMessageService } from 'src/app/shared/services/historic-message.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ReceivedMessageService } from 'src/app/shared/services/received-message.service';
import { HistoricMessage } from 'src/app/models/historic-message.model';

@Component({
  selector: 'app-feat-contact-popup',
  templateUrl: './feat-contact-popup.component.html',
  styleUrls: ['./feat-contact-popup.component.scss']
})
export class FeatContactPopupComponent {

  @Input() user!: User; 
  @Input() receiver!: User; 
  @Input() userDataForReplyTo!: User
  @Input() role!: "ROLE_USER" | "ROLE_ADMIN";
  @Input() isUserFetchedSelected!: boolean;
  @Input() isReplyMode!: boolean
 
  @Output() onCloseContactPopupFormEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  receivedMessage: ReceivedMessage = new ReceivedMessage(
    '', 
    new Date(), 
    new User('', '', '', '', false, [], [], [], [], [], "ROLE_USER" || "ROLE_ADMIN"), 
    new User('', '', '', '', false, [], [], [], [], [], "ROLE_USER" || "ROLE_ADMIN")
  );

  historicMessage: HistoricMessage = new HistoricMessage(
    '', 
    new Date(), 
    new User('', '', '', '', false, [], [], [], [], [], "ROLE_USER" || "ROLE_ADMIN"), 
  );

  notification: Notification = new Notification(
    '', 
    new Date(), 
    new User('', '', '', '', false, [], [], [], [], [], "ROLE_USER" || "ROLE_ADMIN"), 
  );

  messageContent: string = '';

  isContactPopupFormOpen: boolean = false;
  isLoadingComposantActive: boolean = false;
  isNotificationSended: boolean = false;
  isNotificationSendedError: boolean = false;
  isAnimationPopupMessageOperationStatusActive: boolean = false;


  constructor(
    private receivedMessageService: ReceivedMessageService,
    private historicMessageService: HistoricMessageService,
    private notificationService: NotificationService,
    ) {}


  private onAnimateForNotificationSendedSucces() {
    this.isNotificationSended = true;
    this.isAnimationPopupMessageOperationStatusActive = true;
    setTimeout(() => { 
      this.isNotificationSended = false;
      this.isAnimationPopupMessageOperationStatusActive = false;
      this.onCloseContactPopupFormEmit.emit(this.isContactPopupFormOpen);
    }, 6000);
  }

  private onAnimateForNotificationSendedError() {
    this.isNotificationSendedError = true;
    this.isAnimationPopupMessageOperationStatusActive = true;
    setTimeout(() => { 
      this.isNotificationSendedError = false;
      this.isAnimationPopupMessageOperationStatusActive = false;
    }, 6000);
  }

  private onCreateMessageDuplicata() {
    this.historicMessage.resume = this.messageContent;
      const createHistoricMessageObservable = this.historicMessageService.createMessageDuplicata(this.historicMessage, this.user);
      createHistoricMessageObservable.subscribe();
  }

  private onCreateMessage() {
    const createMessageObservable = this.receivedMessageService.createMessage(this.receivedMessage, this.user, this.receiver);
      createMessageObservable.subscribe(
        () => {     
          this.onAnimateForNotificationSendedSucces();

          this.onCreateMessageDuplicata()
          this.isLoadingComposantActive = false;
        },
        () => {
          this.onAnimateForNotificationSendedError();
          this.isLoadingComposantActive = false;
        }
      );
  }




  onSubmitMessage() { 
    if (this.role === 'ROLE_ADMIN' && this.isUserFetchedSelected) {

      this.isLoadingComposantActive = true;
      this.receivedMessage.resume = this.messageContent;    
      this.onCreateMessage()

    } else if (
      (this.role === 'ROLE_ADMIN' && this.isReplyMode) ||
      (this.role === 'ROLE_USER' && this.isReplyMode)
      ) {
      
      this.receiver = this.userDataForReplyTo;
      this.receivedMessage.user = this.user;
      this.receivedMessage.resume = this.messageContent;

      this.isLoadingComposantActive = true;
      
      this.onCreateMessage()

    } else {
      this.isLoadingComposantActive = true;
      this.notification.resume = this.messageContent;
      this.notification.user = this.user;

      const createNotificationObservable = this.notificationService.createNotification(this.notification, this.user);
      createNotificationObservable.subscribe(
        () => {  
          if (this.role === 'ROLE_ADMIN') {
            this.isLoadingComposantActive = false;
            this.onAnimateForNotificationSendedSucces();
          } else {

            this.isLoadingComposantActive = false;
            this.onAnimateForNotificationSendedSucces();
          } 

          this.onCreateMessageDuplicata()        
        },
        () => {
          this.isLoadingComposantActive = false;
         this.onAnimateForNotificationSendedError();
        }
      );
      
    }
  }
  
  
  onCancelContactPopupForm() {
    this.onCloseContactPopupFormEmit.emit(this.isContactPopupFormOpen); 
  }
}
