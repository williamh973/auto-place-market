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
  
  inputValueForSearch: string = '';



  showFilteredCards: boolean = false;


  constructor(private youtubeService: YoutubeService, private router: Router) { }


  ngOnInit(): void {
    this.youtubeService.getCardList().subscribe((cards: Card[]) => {
      this.cardList = [];
      this.cardList = cards;
    });
  }

  

  autoFilterCards(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const title = inputElement.value;

    this.filteredCardList = this.cardList.filter(
      (card: Card) => card.image.toLowerCase().startsWith(title.toLowerCase()) && title.length >= 3
    );
  
    this.youtubeService.postFilterCardList(
      this.filteredCardList
    );
  }



  filterCards() {
    const inputValue = this.inputValueForSearch.toLowerCase();
  
    this.filteredCardList = this.cardList.filter((card: Card) => {

      const matchInputValue = card.title.toLowerCase().startsWith(inputValue);
      console.log(inputValue);
  return matchInputValue

  });

    this.youtubeService.postFilterCardList(
      this.filteredCardList,
    );

    this.router.navigate(['/home']);
  }




 

  
}











