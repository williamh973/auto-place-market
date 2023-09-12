import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { TokenValidityService } from 'src/app/shared/services/token-validity.service';
import { Menu } from 'src/app/models/menu.model';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  mainMenuItems: Menu[] = [
    new Menu('Rechercher un utilisateur', ''),
    new Menu('Voir les annonces', ''),
    new Menu('Déconnexion', '')
  ];

  dropDownMessageMenuItems: Menu[] = [
    new Menu('Boite de reception', ''),
    new Menu('Historique des messages', ''),
  ];

  cardList: Card[] = [];
  filteredCardList: Card[] = [];

  firstname!: String
  lastname!: String

  isAdminCardListOpen: boolean = false;
  isGetDataOpen: boolean = false;
  isUserReceivedMessageListOpen: boolean = false;
  isUserSentMessageListOpen: boolean = false;
  isAdminMode: boolean = false;

  constructor(
    private dbUser: DbUserService,
    private tokenS: TokenService,
    private lsService: LocalStorageService,
    private router: Router,
    private tokenValidityService : TokenValidityService,
    ) { }

  ngOnInit(): void {

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

    this.tokenValidityService.getTokenValidity().pipe(
      catchError(error => {
        if (error.status === 401) {
          return of(false); 
        }
        this.onLogout();
        this.router.navigate(["/home"]);
        throw error;
      })
    ).subscribe();
  }


  onLogout(): void {
    this.lsService.clearTokenAndUserEmail();
    this.tokenS.resetToken();
    this.router.navigate(["/home"]);
  }

  showCardList() {
    this.isAdminCardListOpen = !this.isAdminCardListOpen
    console.log(this.isAdminCardListOpen);
    
  }

  showGetData() {
    this.isGetDataOpen = !this.isGetDataOpen
  } 

  onMainMenuItemClick(menuItem: Menu) {
    if (menuItem.label === 'Rechercher un utilisateur') {
      this.showGetData();
    } else if (menuItem.label === 'Voir les annonces') {
      this.showCardList();
    } else if (menuItem.label === 'Déconnexion') {
      this.onLogout();
    } 
  }

  onDropdownMessageMenuItemClick(menuItem: Menu) {
    // if (menuItem.label === 'Envoyer un message') {
      // this.onContactFormOpen();
    // } else 
    if (menuItem.label === 'Boite de reception') {  
      this.onLoadUserReceivedMessageList();
    } else if (menuItem.label === 'Historique des messages') {
      this.onLoadUserSentMessageList();
    }
  }


  onLoadUserReceivedMessageList() {
    this.isUserReceivedMessageListOpen = !this.isUserReceivedMessageListOpen;
  }

  onLoadUserSentMessageList() {
    this.isUserSentMessageListOpen = !this.isUserSentMessageListOpen;
  }

  // onContactFormOpen() {
  //   this.isContactPopupFormOpen = !this.isContactPopupFormOpen;
  // }

  // onRecevedMethodForCloseContactForm(isContactPopupFormOpen: boolean) {
  //   this.isContactPopupFormOpen = isContactPopupFormOpen;
  // }

}
