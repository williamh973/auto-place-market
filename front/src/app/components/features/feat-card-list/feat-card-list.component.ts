import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/shared/services/card.service';



@Component({
  selector: 'app-feat-card-list',
  templateUrl: './feat-card-list.component.html',
  styleUrls: ['./feat-card-list.component.scss']
})
export class FeatCardListComponent {

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
