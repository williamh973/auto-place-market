import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/shared/services/card.service';
import { DbUserService } from 'src/app/shared/services/db-user.service';



@Component({
  selector: 'app-feat-card-list',
  templateUrl: './feat-card-list.component.html',
  styleUrls: ['./feat-card-list.component.scss']
})
export class FeatCardListComponent {

  @Input() isHomePageCardListOpen!: boolean;
  @Input() isUserCardListOpen!: boolean;
  @Input() isFavoriteListOpen!: boolean;
  @Input() isAdminCardListOpen!: boolean;
  @Input() favoriteCardList!: Card[];

  cardList: Card[] = [];
  filteredCardList: Card[] = [];
  cardListCreatedByUser: Card[] = [];
  filteredCardListCreatedByUser: Card[] = [];


  constructor(
    private cardService: CardService,
    private dbUser: DbUserService
    ) { }
  

  ngOnInit(): void {
    this.cardService.getCardList().subscribe((cardListFromDatabase: Card[]) => {
    this.cardList = cardListFromDatabase;
    }) 
    this.cardService.getFilteredCardList$().subscribe((newFileteredCardList: Card[]) => {
      this.filteredCardList = newFileteredCardList;
      });

    this.dbUser.getUserCards().subscribe((cardListFromDatabase: Card[]) => {
      this.cardListCreatedByUser = cardListFromDatabase;
      });    
      this.dbUser.getFilteredCardListCreatedByUser$().subscribe((newFileteredUserCardList: Card[]) => {
        this.filteredCardListCreatedByUser = newFileteredUserCardList;
        });   
  }
}
