import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/shared/services/card.service';
import { DbUserService } from 'src/app/shared/services/db-user.service';

@Component({
  selector: 'app-feat-card-list-admin',
  templateUrl: './feat-card-list-admin.component.html',
  styleUrls: ['./feat-card-list-admin.component.scss']
})
export class FeatCardListAdminComponent {


  cardList: Card[] = [];
  filteredCardList: Card[] = [];

  isAdminCardListOpen: boolean = false;

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
