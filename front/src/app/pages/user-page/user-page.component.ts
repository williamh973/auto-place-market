import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { Favorite } from 'src/app/models/favorite.model';
import { Menu } from 'src/app/models/menu.model';
import { Message } from 'src/app/models/message.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { FavoriteStatusService } from 'src/app/shared/services/favorite-status.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { TokenService } from 'src/app/shared/services/token.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  mainMenuItems: Menu[] = [
    new Menu('Poster une annonce', ''),
    new Menu('Mes voitures', ''),
    new Menu('Mes favoris', ''),
    new Menu('Déconnexion', '')
  ];

  dropDownAccountMenuItems: Menu[] = [
    new Menu('Supprimer mon compte', ''),
    new Menu('Modifier le numéro de téléphone', ''),
  ];

  dropDownMessageMenuItems: Menu[] = [
    new Menu('Envoyer un message', ''),
    new Menu('Historique des messages', ''),
  ];
 
  cardListCreatedByUser: Card[] = [];
  filteredCardListCreatedByUser: Card[] = [];
  favoriteCardList: Card[] = [];
  messageListCreatedByUser: Message[] = [];
  filteredMessageListCreatedByUser: Message[] = [];

  firstname!: String;
  lastname!: String;
 
  isFavoriteListOpen: boolean = false;
  isUserCardListOpen: boolean = true;
  isEditCardFormOpen: boolean = false;
  isConfirmDeleteCurrentUserPopupOpen: boolean = false;
  isContactPopupFormOpen: boolean = false;
  isUserMessageListOpen: boolean = false;

  favoriteCards: number[] = [];


  constructor( 
    private dbUser: DbUserService,
    private tokenS: TokenService,
    private lsService: LocalStorageService,
    private favoriteService: FavoriteService,
    private favoriteStatusService: FavoriteStatusService,
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
        });     

        this.favoriteStatusService.getFavoriteCardsSubject$().subscribe((favoriteCards) => {
          this.favoriteCards = favoriteCards;
          console.log(favoriteCards);
        });
    }


    loadFavoriteCardList() {
      this.isFavoriteListOpen = !this.isFavoriteListOpen;
      if (this.isFavoriteListOpen) {
        const userEmailInLocalStorage = localStorage.getItem('userEmail');
        if (userEmailInLocalStorage) {
          this.favoriteService.getFavoriteList(userEmailInLocalStorage).subscribe(
            (favoriteList: Favorite[]) => { 
              this.favoriteCardList = favoriteList.map(favorite => favorite.card);
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

    onLogout(): void {
      this.lsService.clearTokenAndUserEmail();
      this.tokenS.resetToken();
      this.router.navigate(["/home"]);
    }

    onEditCardFormOpen() {
        this.isEditCardFormOpen = !this.isEditCardFormOpen;
    }

    onContactFormOpen() {
      this.isContactPopupFormOpen = !this.isContactPopupFormOpen;
  }

    loadUserCardList() {
      this.isUserCardListOpen = !this.isUserCardListOpen
    }
    
    deleteAccount(): void {
      this.isConfirmDeleteCurrentUserPopupOpen = true;
    }
    
    changePhoneNumber(): void {
      
    }

    onLoadUserMessageList() {
      this.isUserMessageListOpen = !this.isUserMessageListOpen;
    }
    
    onRecevedMethodForCloseEditCardForm(isEditCardFormOpen: boolean) {
      this.isEditCardFormOpen = isEditCardFormOpen;
    }

    onRecevedMethodForCloseConfirmDeleteUserPopup(isConfirmDeleteCurrentUserPopupOpen: boolean) {
      this.isConfirmDeleteCurrentUserPopupOpen = isConfirmDeleteCurrentUserPopupOpen;
    }

    onRecevedMethodForCloseContactForm(isContactPopupFormOpen: boolean) {
      this.isContactPopupFormOpen = isContactPopupFormOpen;
    }

    onMainMenuItemClick(menuItem: Menu) {
      if (menuItem.label === 'Poster une annonce') {
        this.onEditCardFormOpen();
      } else if (menuItem.label === 'Mes voitures') {
        this.loadUserCardList();
      } else if (menuItem.label === 'Mes favoris') {
        this.loadFavoriteCardList();
      } else if (menuItem.label === 'Déconnexion') {
        this.onLogout();
      } 
    }

  onDropdownAccountMenuItemClick(menuItem: Menu) {
    if (menuItem.label === 'Supprimer mon compte') {
      this.deleteAccount();
    } else if (menuItem.label === 'Modifier le numéro de téléphone') {
      this.changePhoneNumber();
    }
  }

    onDropdownMessageMenuItemClick(menuItem: Menu) {
      if (menuItem.label === 'Envoyer un message') {
        this.onContactFormOpen();
      } else if (menuItem.label === 'Historique des messages') {
        this.onLoadUserMessageList();
      }
    }
}
