import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { Favorite } from 'src/app/models/favorite.model';
import { User } from 'src/app/models/user.model';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-feat-card-list-favorite',
  templateUrl: './feat-card-list-favorite.component.html',
  styleUrls: ['./feat-card-list-favorite.component.scss']
})
export class FeatCardListFavoriteComponent {

  @Input() user!: User;
  @Input() favoriteCardList!: Card[]

  constructor(private favoriteService: FavoriteService) {}
  

  ngOnInit() {
      const userEmailInLocalStorage = localStorage.getItem('userEmail');
      if (userEmailInLocalStorage) {
        this.favoriteService.getFavoriteList(userEmailInLocalStorage).subscribe(
          (favoriteList: Favorite[]) => { 
            this.favoriteCardList = favoriteList.map(favorite => favorite.card);
          },
          (error: any) => {
            console.log("Erreur lors de la récupération des favoris :", error);
          }
        );
      } else {
        console.log("L'utilisateur n'est pas connecté.");
      }

  }
 

}
