import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { YoutubeService } from 'src/app/shared/services/youtube.service';

@Component({
  selector: 'app-feat-search',
  templateUrl: './feat-search.component.html',
  styleUrls: ['./feat-search.component.scss']
})
export class FeatSearchComponent {


  cardList: Card[] = [];
  filteredCardList: Card[] = [];
  
  titleValueInSearchInput: string = '';
  valueInPriceInput: number | undefined = undefined;
  valueInKilometricInput: number | undefined = undefined;

  showFilteredCards: boolean = false;


  constructor(
    private youtubeService: YoutubeService
    ) { }


  ngOnInit(): void {
    this.youtubeService.getCardList().subscribe(
      (cards: Card[]) => {
      this.cardList = [];
      this.cardList = cards;
    });
  } 




  filterCardsByTitle() {
    if (this.titleValueInSearchInput) {
      this.filteredCardList = this.cardList.filter(
        (card: Card) => (
          card.title.toLowerCase().startsWith(
            this.titleValueInSearchInput.toLowerCase()
            ) && this.titleValueInSearchInput.length >= 1
      ));
    } else {
      this.filteredCardList = [...this.cardList];
    }
    this.youtubeService.postFilterCardList(
      this.filteredCardList,
    ); 
  }

  filterCardsByPrice() {

  }

  filterCardsByKilometric() {

  }
  




  
}











