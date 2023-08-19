import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/shared/services/card.service';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Menu } from 'src/app/models/menu.model';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  mainMenuItems: Menu[] = [
    new Menu('Rechercher un utilisateur', ''),
    new Menu('Déconnexion', '')
  ];

  cardList: Card[] = [];
  filteredCardList: Card[] = [];

  firstname!: String
  lastname!: String

  isCardListOpen: boolean = false;
  isGetDataOpen: boolean = false;

  constructor(
    private cardService: CardService,
    private dbUser: DbUserService,
    private tokenS: TokenService,
    private lsService: LocalStorageService,
    private router: Router) { }

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

      
    this.cardService.getCardList().subscribe((cardListFromDatabase: Card[]) => {
    this.cardList = cardListFromDatabase;
    }) 

 
    this.cardService.getFilteredCardList$().subscribe((newFileteredCardList: Card[]) => {
      this.filteredCardList = newFileteredCardList;
    });
  }


  onLogout(): void {
    this.lsService.clearTokenAndUserEmail();
    this.tokenS.resetToken();
    this.router.navigate(["/home"]);
  }

  showCardList() {
    this.isCardListOpen = !this.isCardListOpen
  }

  showGetData() {
    this.isGetDataOpen = !this.isGetDataOpen
  }

  onMainMenuItemClick(menuItem: Menu) {
    if (menuItem.label === 'Rechercher un utilisateur') {
      this.showGetData();
    } else if (menuItem.label === 'Déconnexion') {
      this.onLogout();
    } 
  }

}
