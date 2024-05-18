import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';


@Component({
  selector: 'app-feat-card-user',
  templateUrl: './feat-card-user.component.html',
  styleUrls: ['./feat-card-user.component.scss']
})
export class FeatCardUserComponent {

  @Input() card!: Card;
  @Input() createMode: boolean = false;

  isEditCardFormOpen: boolean = false;
  isFavorite: boolean = false;
  isConfirmDeletePopup: boolean = false;
  isConfirmUpdatePopupOpen: boolean = false;
  firstPictureSrc: string = '';


  ngOnInit(): void {
    this.card.picturesList.sort((pictureA, pictureB) => (pictureA.id ?? 0) - (pictureB.id ?? 0));   

    if (this.card.picturesList.length > 0) {
      this.firstPictureSrc = this.card.picturesList[0].src;
    }
  }


  openConfirmDeletePopup() {
    this.isConfirmDeletePopup = true;
  }
  
  openConfirmeUpdateFormPopup() {
    this.isConfirmUpdatePopupOpen = true;
  }
  
   
  
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
  
  onRecevedMethodForCloseConfirmDeletePopup(isConfirmDeletePopup: boolean) {
    this.isConfirmDeletePopup = isConfirmDeletePopup;
  }
  
  onRecevedMethodForCloseConfirmUpdateCardFormPopup(isConfirmUpdatePopupOpen: boolean) {
  this.isConfirmUpdatePopupOpen = isConfirmUpdatePopupOpen;
  }
  
  
}
