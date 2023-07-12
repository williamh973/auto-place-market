import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/shared/services/card.service';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { TokenService } from 'src/app/shared/services/token.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  cardList: Card[] = [];
  filteredCardList: Card[] = [];

  firstname!: String

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

      
    this.cardService.getCardList().subscribe((cardListFromDatabase: Card[]) => {
    this.cardList = cardListFromDatabase;
    }) 

 
    this.cardService.getFilteredCardList$().subscribe((newFileteredCardList: Card[]) => {
      this.filteredCardList = newFileteredCardList;
    });
  }

  clearToken(): void {
    this.lsService.clearToken();
    this.tokenS.resetToken();
    this.router.navigate(["/home"]);
  }


}
