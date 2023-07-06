import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/shared/services/card.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  cardList: Card[] = [];
  filteredCardList: Card[] = [];

  constructor(private cardService: CardService) { }

  ngOnInit(): void {

    this.cardService.getCardList().subscribe((cardListFromDatabase: Card[]) => {
    this.cardList = cardListFromDatabase;
    }) 

 
    this.cardService.getFilteredCardList$().subscribe((newFileteredCardList: Card[]) => {
      this.filteredCardList = newFileteredCardList;
    });
  }

}
