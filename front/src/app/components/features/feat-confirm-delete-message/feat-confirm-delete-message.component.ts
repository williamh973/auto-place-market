// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { Message } from 'src/app/models/message.model';
// import { User } from 'src/app/models/user.model';
// import { MessageService } from 'src/app/shared/services/message.service';

// @Component({
//   selector: 'app-feat-confirm-delete-message',
//   templateUrl: './feat-confirm-delete-message.component.html',
//   styleUrls: ['./feat-confirm-delete-message.component.scss']
// })
// export class FeatConfirmDeleteMessageComponent {

//   @Input() message: Message = new Message('', new Date(), new User('', '', '', '', [], [], [], 'ROLE_USER'));
//   @Input() messageListCreatedByUser: Message[] = [];

//   @Output() onConfirmDeleteMessagePopupEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

//   isCancelBtnClicked: boolean = false;


//   constructor(private messageService: MessageService) {}

//   ngOnInit() {
//     console.log(this.messageListCreatedByUser);
//   }


//   onDeleteMessage(message: Message) {
//     this.messageService.deleteMessage(message.id as number).subscribe(() => {
//       const index = this.messageListCreatedByUser.findIndex(p => p.id === message.id);
//           if (index !== -1) {
//             this.messageListCreatedByUser.splice(index, 1);
//           }
//         })
//       };

//   onCancelConfirmPopup() {
//   this.onConfirmDeleteMessagePopupEmit.emit(this.isCancelBtnClicked);
//   }
  
// }
