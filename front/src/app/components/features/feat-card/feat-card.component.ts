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
  isCarFavoritedDeleteError: boolean = false;

  favoriteId: number | null = null;
  favoriteCards: number[] = [];

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


  toggleFavorite() {
    this.isFavorite = !this.isFavorite;

    if (this.isFavorite && this.card.id) {
      const userEmailInLocalStorage = this.localStorageService.getUserEmail();;
      
      if (!userEmailInLocalStorage) {
        console.log("Vous devez être connecté pour ajouter un favori.");
        this.isFavorite = !this.isFavorite;
        return;
      }

      this.favoriteService.addToFavorites(userEmailInLocalStorage, this.card.id).subscribe(
        (responseFavorite) => {
          if(this.card.id) {
            this.favoriteId = responseFavorite.id ?? null;
            this.favoriteStatusService.setFavoriteStatus(this.card.id, true);

            localStorage.setItem('favoriteId', JSON.stringify(this.favoriteId));
            
            this.isCardFavoriteAdded = true;
            setTimeout(() => { 
              this.isCardFavoriteAdded = false;
            }, 2000);
          }
        }
      );
    } else {
        this.onDeleteFavorite();
      }
    }
      

    onDeleteFavorite() {
        const favoriteIdFromLocalStorage = localStorage.getItem('favoriteId');
          if (favoriteIdFromLocalStorage) {
            this.favoriteId = Number(favoriteIdFromLocalStorage); 
          }

      if (!this.isFavorite && this.favoriteId) {
      const userEmailInLocalStorage = localStorage.getItem('userEmail');
      
      if (!userEmailInLocalStorage) {
        console.log("Vous devez être connecté pour supprimer un favori.");
        return;
      }
      this.favoriteService.removeFromFavorites(userEmailInLocalStorage, this.favoriteId).subscribe(
        () => {
          if(this.card.id) {
            this.isCardFavoriteDelete = true;
            setTimeout(() => {
              this.isCardFavoriteDelete = false;
            }, 2000);

          this.isFavorite = false;
          this.favoriteId = null;
          this.favoriteStatusService.setFavoriteStatus(this.card.id, false);
          localStorage.removeItem('favoriteId');
          }
        }
      );
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
