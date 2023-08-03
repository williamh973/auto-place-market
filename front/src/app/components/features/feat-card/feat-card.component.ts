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

  favoriteId: number | null = null;
  favoriteCards: number[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private favoriteStatusService: FavoriteStatusService,
    private localStorageService: LocalStorageService,
    
    ) {}


    // ngOnInit(): void {
    //   this.favoriteStatusService.getFavoriteCardsSubject$().subscribe((favoriteCards) => {
    //     this.favoriteCards = favoriteCards; 
    //   });
    // }
    ngOnInit(): void {
      this.favoriteStatusService.getFavoriteCardsSubject$().subscribe((favoriteCards) => {
        this.favoriteCards = favoriteCards;
     });
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
            console.log("La card a été ajoutée aux favoris.");
            console.log(this.favoriteId);
            this.favoriteStatusService.setFavoriteStatus(this.card.id, true);
          }
        },
        (error) => {
          console.log("Échec de l'ajout aux favoris.");
          this.isFavorite = !this.isFavorite;
        }
      );
      
    } else if (!this.isFavorite && this.favoriteId) {
      const userEmailInLocalStorage = localStorage.getItem('userEmail');
      if (!userEmailInLocalStorage) {
        console.log("Vous devez être connecté pour supprimer un favori.");
        return;
      }
      this.favoriteService.removeFromFavorites(userEmailInLocalStorage, this.favoriteId).subscribe(
        () => {
          if(this.card.id) {
          console.log("La card a été supprimée des favoris");
          this.isFavorite = false;
          this.favoriteId = null;
          this.favoriteStatusService.setFavoriteStatus(this.card.id, false);
          }
        },
        (error) => {
          console.log("Échec de la suppression du favori.");
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
