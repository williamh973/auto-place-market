import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { FavoriteService } from 'src/app/shared/services/favorite.service';


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



  constructor(private favoriteService: FavoriteService) {}



  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  
    if (this.isFavorite && this.card.id) {
      this.favoriteService.addToFavorites(this.card.user.email, this.card.id).subscribe(
        (responseFavorite) => {
          console.log("La card a été ajoutée aux favoris.", responseFavorite);
        },
        (error) => {
          console.log("Échec de l'ajout aux favoris.");
        }
      );
    } else if (!this.isFavorite && this.card.id) {
      this.favoriteService.removeFromFavorites(this.card.user.email, this.card.id).subscribe(
        () => {
          console.log("La card a été supprimée des favoris");
        },
        (error) => {
          console.log("Échec de la suppression des favoris.");
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
