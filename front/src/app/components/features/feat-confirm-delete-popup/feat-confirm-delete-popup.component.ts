import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { YoutubeService } from 'src/app/shared/services/youtube.service';

@Component({
  selector: 'app-feat-confirm-delete-popup',
  templateUrl: './feat-confirm-delete-popup.component.html',
  styleUrls: ['./feat-confirm-delete-popup.component.scss']
})
export class FeatConfirmDeletePopupComponent {
  
  @Input() cardChild!: Card;

  @Output() onisConfirmDeletePopupEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  isConfirmDeletePopup: boolean = false;
  
  isCardEditFormToggle: boolean = false;

  constructor(private youtubeService: YoutubeService) {}
  

  onCloseConfirmeDeletePopup() {
    this.onisConfirmDeletePopupEmit.emit(this.isConfirmDeletePopup);
  } 

  deleteCard() {
    this.youtubeService.delete(this.cardChild.id as number).subscribe();
    window.location.reload();
  }

}
