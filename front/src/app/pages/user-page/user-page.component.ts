import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/shared/services/card.service';
import { DbUserService } from 'src/app/shared/services/db-user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { TokenService } from 'src/app/shared/services/token.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

 
  cardListCreatedByUser: Card[] = [];
  filteredCardListCreatedByUser: Card[] = [];

  firstname!: String;
  lastname!: String;
 

  constructor( 
    private dbUser: DbUserService,
    private cardService: CardService,
    private tokenS: TokenService,
    private lsService: LocalStorageService,
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



      // this.cardService.getCardList().subscribe((cardListFromDatabase: Card[]) => {
      //   this.cardListCreatedByUser = cardListFromDatabase;
      //   }) 

      this.dbUser.getUserCards().subscribe((cardListFromDatabase: Card[]) => {
        this.cardListCreatedByUser = cardListFromDatabase;
        }) 
     
     
        // this.cardService.getFilteredCardList$().subscribe((newFileteredCardList: Card[]) => {
        //   this.filteredCardListCreatedByUser = newFileteredCardList;
        // });

    }


    clearToken(): void {
      this.lsService.clearToken();
      this.tokenS.resetToken();
      this.router.navigate(["/home"]);
    }
  


}
