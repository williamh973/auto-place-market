import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-feat-confirm-update-card-popup',
  templateUrl: './feat-confirm-update-card-popup.component.html',
  styleUrls: ['./feat-confirm-update-card-popup.component.scss']
})
export class FeatConfirmUpdateCardPopupComponent {

  @Input() card!: Card;
  @Output() onConfirmUpdatePopupEmit: EventEmitter<boolean> = new EventEmitter<boolean>();


  isConfirmUpdatePopupOpen: boolean = false;
  isCardEditFormToggle: boolean = false;
  isEditCardFormOpen: boolean = false;


  onCloseConfirmeUpdatePopup() {
    this.onConfirmUpdatePopupEmit.emit(this.isConfirmUpdatePopupOpen);
  } 
  onRecevedMethodForCloseEditCardForm(isEditCardFormOpen: boolean) {
    this.isEditCardFormOpen = isEditCardFormOpen;
  }

  onUpdateCard() {
    this.isEditCardFormOpen = true;
  }

}
