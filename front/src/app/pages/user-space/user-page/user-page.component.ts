import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { Favorite } from 'src/app/models/favorite.model';
import { Menu } from 'src/app/models/menu.model';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { TokenValidityService } from 'src/app/shared/services/token-validity.service';
import { TokenService } from 'src/app/shared/services/token.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  user: User = new User('', '', '', '', false, [], [], [], 'ROLE_USER' || 'ROLE_ADMIN')
 
  favoriteCardList: Card[] = [];
  
  messageListCreatedByUser: Message[] = [];
  filteredMessageListCreatedByUser: Message[] = [];
  
  role!: "ROLE_USER" | "ROLE_ADMIN";

  isFavoriteListOpen: boolean = false;
  isUserCardListOpen: boolean = false;
  isEditCardFormOpen: boolean = false;
  isAnimationTrackHttpStatusActive: boolean = false; 
  isGetDataOpen: boolean = false;
  isAdminCardListOpen: boolean = false;
  isConfirmDeleteCurrentUserPopupOpen: boolean = false;
  isContactPopupFormOpen: boolean = false;
  isUserMessageListOpen: boolean = false;
  isUserReceivedMessageListOpen: boolean = false;
  isUserDisabledListOpen: boolean = false;


  adminMainMenuItems: Menu[] = [
    new Menu('Voir les annonces', ''),
    new Menu('Déconnexion', '')
  ];

  userMainMenuItems: Menu[] = [
    new Menu('Poster une annonce', ''),
    new Menu('Mes voitures', ''),
    new Menu('Mes favoris', ''),
    new Menu('Déconnexion', '')
  ];


  constructor( 
    private dbUser: DbUserService,
    private tokenS: TokenService,
    private lsService: LocalStorageService,
    private favoriteService: FavoriteService,
    private tokenValidityService : TokenValidityService,
    private router: Router
    ) {}


    ngOnInit() {

      this.tokenS._getTokenDetailsSubject$()
       .pipe(
        map((decodedToken: any) => ({
          role: decodedToken.role
        }))
      ).subscribe((tokenDetails: any) => {
        this.role = tokenDetails.role;
      });

      this.dbUser.getCurrentUserData().subscribe(
        (user: User) => {
          this.user = user;
        },
        (error: any) => {
          console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
        }
      );
    
      this.tokenValidityService.getTokenValidity().pipe(
        catchError(error => {
          if (error.status === 401) {
            return of(false); 
          }
          this.onLogout();
          this.lsService.clearTokenAndUserEmail();
          this.tokenS.resetToken();
          this.router.navigate(["/home"]);
          throw error;
        })
      ).subscribe();
        
    }

    
    onAdminMainMenuItemClick(menuItem: Menu) {
      if (menuItem.label === 'Voir les annonces') {
        this.showCardList();

      }  else if (menuItem.label === 'Déconnexion') {
        this.onLogout();
      } 
    }

    onUserMainMenuItemClick(menuItem: Menu) {
      if (menuItem.label === 'Poster une annonce') {
        this.onEditCardFormOpen();

      }  else if (menuItem.label === 'Mes voitures') {
        this.loadUserCardList();

      } else if (menuItem.label === 'Mes favoris') {
        this.loadFavoriteCardList();

      } else if (menuItem.label === 'Déconnexion') {
        this.onLogout();
      } 
    }

    showCardList() {
      this.isAdminCardListOpen = !this.isAdminCardListOpen
    }

    onLogout(): void {
      this.lsService.clearTokenAndUserEmail();
      this.tokenS.resetToken();
      this.router.navigate(["/home"]);
    }

    onEditCardFormOpen() {
      this.isEditCardFormOpen = !this.isEditCardFormOpen;
    }

    loadUserCardList() {
      this.isUserCardListOpen = !this.isUserCardListOpen
    }
    
    loadFavoriteCardList() {
      this.isFavoriteListOpen = !this.isFavoriteListOpen;
      if (this.isFavoriteListOpen) {
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
      } else {
        this.isFavoriteListOpen = false; 
      }
    }
    
    onForCloseEditCardForm(isEditCardFormOpen: boolean) {
      this.isEditCardFormOpen = isEditCardFormOpen;
    }

    onForOpenConfirmDeleteCurrentUserPopup() {
      this.isConfirmDeleteCurrentUserPopupOpen = !this.isConfirmDeleteCurrentUserPopupOpen
    }

    onForCloseConfirmDeleteUserPopup(isConfirmDeleteCurrentUserPopupOpen: boolean) {
      this.isConfirmDeleteCurrentUserPopupOpen = isConfirmDeleteCurrentUserPopupOpen;
    }

    onForOpenContactFormPopup(isContactPopupFormOpen: boolean) {
      this.isContactPopupFormOpen = isContactPopupFormOpen;
    }

    onForCloseContactForm(isContactPopupFormOpen: boolean) {
      this.isContactPopupFormOpen = isContactPopupFormOpen;
    }

    onForLoadUserReceivedMessageList() {
      this.isUserReceivedMessageListOpen = !this.isUserReceivedMessageListOpen
    }

    onForLoadUserMessageList() {
      this.isUserMessageListOpen = !this.isUserMessageListOpen
    }

    onForOpenGetData() {
      this.isGetDataOpen = !this.isGetDataOpen
    }

    onForLoadUserDisabledList() {
      this.isUserDisabledListOpen = !this.isUserDisabledListOpen
    }

}
