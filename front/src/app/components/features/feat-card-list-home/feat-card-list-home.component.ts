import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/shared/services/card.service';
import { DbUserService } from 'src/app/shared/services/db-user.service';



@Component({
  selector: 'app-feat-card-list-home',
  templateUrl: './feat-card-list-home.component.html',
  styleUrls: ['./feat-card-list-home.component.scss']
})
export class FeatCardListHomeComponent {

 
  cardList: Card[] = [];
  filteredCardList: Card[] = [];



  constructor(
    private cardService: CardService,
    private dbUser: DbUserService
    ) { }
  

  ngOnInit() {

    this.cardService.getCardList().subscribe((cardListFromDatabase: Card[]) => {
      this.cardList = cardListFromDatabase;
      }) 
      this.cardService.getFilteredCardList$().subscribe((newFileteredCardList: Card[]) => {
        this.filteredCardList = newFileteredCardList;
        });

  }


}
