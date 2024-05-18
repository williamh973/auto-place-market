import { Component, Input } from '@angular/core';

import { Card } from 'src/app/models/card.model';
import { FavoriteStatusService } from 'src/app/shared/services/favorite-status.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';


@Component({
  selector: 'app-feat-card',
  templateUrl: './feat-card.component.html',
  styleUrls: ['./feat-card.component.scss']
})
export class FeatCardComponent {
  
  
  @Input() card!: Card;

  isCardEditFormToggle: boolean = false;
  isFavorite: boolean = false;
  isConfirmDeletePopup: boolean = false;
  isCardFavoriteAdded: boolean = false;
  isCardFavoriteAddedError: boolean = false;
  isCardFavoriteDelete: boolean = false;
  isCardFavoritedDeleteError: boolean = false;
  isUserLoggedInForAddFavorite: boolean = false;
  isAnimationPopupCardOperationStatusActive: boolean = false; 
  favoriteId: number[] = [];
  favoriteCards: number[] = [];
  favoriteIdsList: { cardId: number; favoriteId: number; }[] = [];
  firstPictureSrc: string = '';
  

  constructor(
    private favoriteService: FavoriteService,
    private favoriteStatusService: FavoriteStatusService,
    private localStorageService: LocalStorageService,
    ) {}


  ngOnInit(): void {
    this.isFavorite = this.favoriteStatusService.getFavoriteStatus(this.card.id || 0);
    this.card.picturesList.sort((pictureA, pictureB) => (pictureA.id ?? 0) - (pictureB.id ?? 0));   
    
    if (this.card.picturesList.length > 0) {
      this.firstPictureSrc = this.card.picturesList[0].src;
    }
  }

  private showCardOperationStatusForFavoriteAdded() {
    this.isCardFavoriteAdded = true;
    this.isAnimationPopupCardOperationStatusActive = true;
    setTimeout(() => { 
      this.isCardFavoriteAdded = false;
      this.isAnimationPopupCardOperationStatusActive = false;
    }, 3000);
}

private showCardOperationStatusForFavoriteDeleted() {
   this.isCardFavoriteDelete = true;
   this.isAnimationPopupCardOperationStatusActive = true;
   setTimeout(() => { 
     this.isCardFavoriteDelete = false;
     this.isAnimationPopupCardOperationStatusActive = false;
   }, 3000);
}

private onUserEmailIsNotInLocalStorage() {
   this.isUserLoggedInForAddFavorite = true;
   this.isAnimationPopupCardOperationStatusActive = true;
   setTimeout(() => { 
     this.isUserLoggedInForAddFavorite = false;
     this.isAnimationPopupCardOperationStatusActive = false;
   }, 3000);
   this.isFavorite = !this.isFavorite;
}

toggleFavorite() {
  this.isFavorite = !this.isFavorite;

  if (this.isFavorite && this.card.id) { 
    const userEmailInLocalStorage = this.localStorageService.getUserEmail();
    if (!userEmailInLocalStorage) {
      this.onUserEmailIsNotInLocalStorage();
      return;
    }
    this.favoriteService.addToFavorites(userEmailInLocalStorage, this.card.id).subscribe(
      (responseFavorite) => {
        if (this.card.id && responseFavorite.id) {         
          this.favoriteIdsList = JSON.parse(localStorage.getItem('favoriteId') || '[]');
          this.favoriteIdsList = Array.isArray(this.favoriteIdsList) ? this.favoriteIdsList : [];
          this.favoriteIdsList.push({cardId: this.card.id || 0, favoriteId: responseFavorite.id || 0 });

          localStorage.setItem('favoriteId', JSON.stringify(this.favoriteIdsList));
          this.favoriteStatusService.setFavoriteStatus(this.card.id, true);
          
          this.showCardOperationStatusForFavoriteAdded();
          console.log("favoriteIdsList : ", localStorage.getItem('favoriteId'));
        }
      });
  } else {
    this.onDeleteFavorite();
  }
}
                                              
onDeleteFavorite() {     
  this.favoriteIdsList = JSON.parse(localStorage.getItem('favoriteId') || '[]');

  if (!this.isFavorite && this.favoriteIdsList.length > 0 && this.card.id) {
    const userEmailInLocalStorage = localStorage.getItem('userEmail');
    if (!userEmailInLocalStorage) {
      console.log("Vous devez être connecté pour supprimer un favori.");
      return;
    }

    const favoriteIdFromLocalStorage = localStorage.getItem('favoriteId');
    if (favoriteIdFromLocalStorage) {
      this.favoriteIdsList = JSON.parse(favoriteIdFromLocalStorage); 
    }
          
    const favoriteToRemove = this.favoriteIdsList.find(favorite => favorite.cardId === this.card.id);
      console.log("favoriteToRemove", favoriteToRemove);
  
      if (favoriteToRemove) {
        this.favoriteService.removeFromFavorites(userEmailInLocalStorage, favoriteToRemove.favoriteId).subscribe(
          () => {
            this.showCardOperationStatusForFavoriteDeleted();
            this.favoriteIdsList = this.favoriteIdsList.filter(favorite => favorite.cardId !== this.card.id);
            localStorage.setItem('favoriteId', JSON.stringify(this.favoriteIdsList));  
            console.log("favoriteIdsList : ", localStorage.getItem('favoriteId'));
            if (this.card.id) {
              this.favoriteStatusService.setFavoriteStatus(this.card.id, false);              
            }
          }
        );
      }
    }
  }
  
  toggleCardEditForm(value: boolean) {
    this.isCardEditFormToggle = value;
  }

  openEditDialogue() {
    this.isCardEditFormToggle = !this.isCardEditFormToggle;
  }

  openConfirmDeletePopup() {
    this.isConfirmDeletePopup = true;
  }
  
  onRecevedMethodForCloseConfirmDeletePopup(isConfirmDeletePopup: boolean) {
    this.isConfirmDeletePopup = isConfirmDeletePopup;
  }

}
