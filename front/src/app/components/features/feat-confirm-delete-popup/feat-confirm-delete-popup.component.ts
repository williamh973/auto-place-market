import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-feat-confirm-delete-popup',
  templateUrl: './feat-confirm-delete-popup.component.html',
  styleUrls: ['./feat-confirm-delete-popup.component.scss']
})
export class FeatConfirmDeletePopupComponent {
  
  @Input() card!: Card;

  @Output() onisConfirmDeletePopupEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  isConfirmDeletePopup: boolean = false;
  isCardEditFormToggle: boolean = false;
  isCardDeleted: boolean = false;
  isCardDeletedError: boolean = false;
 

  constructor(private cardService: CardService) {}
  

  onCloseConfirmeDeletePopup() {
    this.onisConfirmDeletePopupEmit.emit(this.isConfirmDeletePopup);
  } 

  deleteCard() {
    this.cardService.deleteCard(this.card.id as number).subscribe(
      () => {
        this.isCardDeleted = true;
        setTimeout(() => {
          this.isCardDeleted = false;
          window.location.reload();
        }, 1000);
      () => {
        this.isCardDeletedError = true;
        setTimeout(() => {
          this.isCardDeletedError = false;
        }, 1000);
       }
    });

  }

}
