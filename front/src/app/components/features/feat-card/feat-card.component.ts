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

   @Input() card!: Card


  isCardEditFormToggle: boolean = false;
  isFavorite: boolean = false;
  isConfirmDeletePopup: boolean = false;



  constructor(
    private favoriteService: FavoriteService,
    private favoriteStatusService: FavoriteStatusService,
    private lsService: LocalStorageService,
    
    ) {}


    ngOnInit() {
 
    }

 

  // toggleFavorite() {
  //   this.isFavorite = !this.isFavorite;
  
  //   if (this.isFavorite && this.card.id) {
  //     const userEmailInLocalStorage = localStorage.getItem('userEmail');
  //     if (!userEmailInLocalStorage) {
  //       console.log("Vous devez être connecté pour ajouter un favori.");
  //       this.isFavorite = !this.isFavorite;
  //       return;
  //     }
  //  try {
  //     this.favoriteService.addToFavorites(userEmailInLocalStorage, this.card.id).subscribe(
  //       (responseFavorite) => {
  //         console.log("La card a été ajoutée aux favoris.", responseFavorite);
  //       },
  //     );
  //   } catch (error) {
  //     console.log("Échec de l'ajout aux favoris.", error);
  //   }
  //     this.lsService.setFavoriteStatus(this.card.id, this.isFavorite);
  //   } else if (!this.isFavorite && this.card.id) {
  //     const userEmailInLocalStorage = localStorage.getItem('userEmail');
  //     if (!userEmailInLocalStorage) {
  //       console.log("Vous devez être connecté pour ajouter un favori.");
  //       this.isFavorite = false; 
  //       return;
  //     }
  //     try {  
  //       this.favoriteService.removeFromFavorites(userEmailInLocalStorage, this.card.id).subscribe(
  //       (responseFavorite) => {
  //         console.log("La card a été supprimée des favoris", responseFavorite);
  //         this.isFavorite = false;
  //       },
  //       ); 
  //     } catch (error) {
  //       console.log("Échec de l'ajout aux favoris.", error);
  //     }
  //     if(this.card.id) {
  //       this.lsService.setFavoriteStatus(this.card.id, this.isFavorite);
  //     }
  //   }
  // }


   
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  
    if (this.isFavorite && this.card.id) {
      const userEmailInLocalStorage = localStorage.getItem('userEmail');
      
      if (!userEmailInLocalStorage) {
        console.log("Vous devez être connecté pour ajouter un favori.");
        this.isFavorite = !this.isFavorite;
        return;
      }
      this.favoriteService.addToFavorites(userEmailInLocalStorage, this.card.id).subscribe(
        (responseFavorite) => {
          console.log("La card a été ajoutée aux favoris.");
        },
        (error) => {
          console.log("Échec de l'ajout aux favoris.");
          this.isFavorite = !this.isFavorite;
        }
      );
      this.favoriteStatusService.setFavoriteStatus(this.card.id, this.isFavorite);
      console.log(localStorage.getItem("favoriteCards"));
      
      
    } else if (!this.isFavorite && this.card.id) {
      const userEmailInLocalStorage = localStorage.getItem('userEmail');
      if (!userEmailInLocalStorage) {
        console.log("Vous devez être connecté pour ajouter un favori.");
        this.isFavorite = !this.isFavorite;
        return;
      }
        this.favoriteService.removeFromFavorites(userEmailInLocalStorage, this.card.id).subscribe(
          (responseFavorite) => {
          console.log("La card a été supprimée des favoris");
          this.isFavorite = false;
        },
        (error) => {
        console.log("Échec de la suppression du favori.");
      }
      );
      this.favoriteStatusService.setFavoriteStatus(this.card.id, this.isFavorite);
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
