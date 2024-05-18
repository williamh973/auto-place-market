import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/shared/services/card.service';


@Component({
  selector: 'app-search-responsive-tablet',
  templateUrl: './search-responsive-tablet.component.html',
  styleUrls: ['./search-responsive-tablet.component.scss']
})
export class SearchResponsiveTabletComponent {


  notFoundMessage: string = '';
  isNoCardFoundPopupDisplay: boolean = false;
  
  cardList: Card[] = [];
  filteredCardList: Card[] = [];
  
  titleValueInSearchInput: string = '';
  valueInPriceInput: number = 0;
  valueInKilometricInput: number | undefined = undefined;

  showFilteredCards: boolean = false;


  constructor(
    private cardService: CardService
    ) { }


  ngOnInit(): void {
    this.cardService.getCardList().subscribe(
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
      this.isNoCardFoundPopupDisplay = false;

      if (this.filteredCardList.length === 0) {
        this.notFoundMessage = "Aucune carte correspondante n'a été trouvée.";
        this.isNoCardFoundPopupDisplay = true;
      }
    } else {
      this.filteredCardList = [...this.cardList];
    }
    this.cardService.postFilterCardList(
      this.filteredCardList,
    ); 
  }


  filterCardsByPrice() {
    if (this.valueInPriceInput) {
      this.filteredCardList = this.cardList.filter(
        (card: Card) => card.price === this.valueInPriceInput
      );
      this.isNoCardFoundPopupDisplay = false;

      if (this.filteredCardList.length === 0) {
        this.notFoundMessage = "Aucune carte correspondante n'a été trouvée.";
        this.isNoCardFoundPopupDisplay = true;
      }
    } else {
      this.filteredCardList = [...this.cardList];
    }
    this.cardService.postFilterCardList(this.filteredCardList);
  }


  filterCardsByKilometric() {
    if (this.valueInKilometricInput) {
      this.filteredCardList = this.cardList.filter(
        (card: Card) => card.kilometer === this.valueInKilometricInput
      );
      this.isNoCardFoundPopupDisplay = false;

      if (this.filteredCardList.length === 0) {
        this.notFoundMessage = "Aucune carte correspondante n'a été trouvée.";
        this.isNoCardFoundPopupDisplay = true;
      }
    } else {
      this.filteredCardList = [...this.cardList];
    }
    this.cardService.postFilterCardList(this.filteredCardList);
  }
  




  
}


