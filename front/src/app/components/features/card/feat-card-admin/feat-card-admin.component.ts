import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-feat-card-admin',
  templateUrl: './feat-card-admin.component.html',
  styleUrls: ['./feat-card-admin.component.scss']
})
export class FeatCardAdminComponent implements OnInit {

  @Input() card!: Card;


  isEditCardFormOpen: boolean = false;
  isFavorite: boolean = false;
  isConfirmDeletePopup: boolean = false;

  firstPictureSrc: string = '';


  ngOnInit() {
    this.card.picturesList.sort((pictureA, pictureB) => (pictureA.id ?? 0) - (pictureB.id ?? 0));     
  
    if (this.card.picturesList.length > 0) {
      this.firstPictureSrc = this.card.picturesList[0].src;
    }
  }

  openEditDialogue() {
    this.isEditCardFormOpen = !this.isEditCardFormOpen;
  }

  openConfirmDeletePopup() {
    this.isConfirmDeletePopup = true;
  }
 
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  onRecevedMethodForCloseConfirmDeletePopup(isConfirmDeletePopup: boolean) {
    this.isConfirmDeletePopup = isConfirmDeletePopup;
  }
  
  onRecevedMethodForCloseEditCardForm(isEditCardFormOpen: boolean) {
    this.isEditCardFormOpen = isEditCardFormOpen;
  }

}
