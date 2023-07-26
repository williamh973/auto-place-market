import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { Favorite } from 'src/app/models/favorite.model';
import { CardService } from 'src/app/shared/services/card.service';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { TokenService } from 'src/app/shared/services/token.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  @Input() userEmail!: string;
 
  cardListCreatedByUser: Card[] = [];
  filteredCardListCreatedByUser: Card[] = [];
  favoriteCardList: Card[] = [];

  firstname!: String;
  lastname!: String;
 
  isFavoriteListOpen: boolean = false;

  constructor( 
    private dbUser: DbUserService,
    private tokenS: TokenService,
    private lsService: LocalStorageService,
    private favoriteService: FavoriteService,
    private router: Router ) {}



    ngOnInit() {
      this.dbUser.getUserFirstnameForUserPage().subscribe(
        (firstname: string) => {
          this.firstname = firstname;
        },
        (error: any) => {
          console.log('Error occurred:', error);
          console.log('Error message:', error.message);
          console.log('Error response:', error.error);
        }
      );

      this.dbUser.getUserLastnameForUserPage().subscribe(
        (lastname: string) => {
          this.lastname = lastname;
        },
        (error: any) => {
          console.log('Error occurred:', error);
          console.log('Error message:', error.message);
          console.log('Error response:', error.error);
        }
      );

      this.dbUser.getUserCards().subscribe((cardListFromDatabase: Card[]) => {
        this.cardListCreatedByUser = cardListFromDatabase;
        }) 

        console.log(this.favoriteCardList);
     
    }


    loadFavoriteCardList() {
      this.isFavoriteListOpen = !this.isFavoriteListOpen;
      if (this.isFavoriteListOpen) {
        const userEmail = this.lsService.getToken();
        if (userEmail !== null) {
          this.favoriteService.getFavoriteList(userEmail).subscribe(
            (favoriteList: Favorite[]) => { 
              this.favoriteCardList = this.cardListCreatedByUser.filter(
                (card) => card.id !== undefined && favoriteList.some(favorite => favorite.card.id === card.id)
              );
              console.log(this.favoriteCardList);
            },
            (error: any) => {
              console.log("Erreur lors de la récupération des favoris :", error);
            }
          );
        } else {
          console.log("L'utilisateur n'est pas connecté.");
        }
      } else {
        this.isFavoriteListOpen = false;
      }
    }

    

    clearToken(): void {
      this.lsService.clearToken();
      this.tokenS.resetToken();
      this.router.navigate(["/home"]);
    }
  


}
