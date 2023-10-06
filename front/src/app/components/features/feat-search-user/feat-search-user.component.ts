import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';

@Component({
  selector: 'app-feat-search-user',
  templateUrl: './feat-search-user.component.html',
  styleUrls: ['./feat-search-user.component.scss']
})
export class FeatSearchUserComponent { 

  notFoundMessage: string = '';
  isNoCardFoundPopupDisplay: boolean = false;
  
  cardListCreatedByUser: Card[] = [];
  filteredCardListCreatedByUser: Card[] = [];
  
  titleValueInSearchInput: string = '';
  valueInPriceInput: number = 0;
  valueInKilometricInput: number | undefined = undefined;

  showFilteredCards: boolean = false;


  constructor(private userService: DbUserService) { }


  ngOnInit() {
    this.userService.getUserCards().subscribe(
      (cards: Card[]) => {
      this.cardListCreatedByUser = [];
      this.cardListCreatedByUser = cards;
    });
  } 

  
  filterCardsByTitle() {
    if (this.titleValueInSearchInput) {
      this.filteredCardListCreatedByUser = this.cardListCreatedByUser.filter(
        (card: Card) => (
          card.title.toLowerCase().startsWith(
            this.titleValueInSearchInput.toLowerCase()
            ) && this.titleValueInSearchInput.length >= 1
      ));
      this.isNoCardFoundPopupDisplay = false;

      if (this.filteredCardListCreatedByUser.length === 0) {
        this.notFoundMessage = "Aucune carte correspondante n'a été trouvée.";
        this.isNoCardFoundPopupDisplay = true;
      }
    } else {
      this.filteredCardListCreatedByUser = [...this.cardListCreatedByUser];
    }
    this.userService.postFilterCardListCreatedByUser(this.filteredCardListCreatedByUser); 
  }


  filterCardsByPrice() {
    if (this.valueInPriceInput) {
      this.filteredCardListCreatedByUser = this.cardListCreatedByUser.filter(
        (card: Card) => card.price === this.valueInPriceInput
      );
      this.isNoCardFoundPopupDisplay = false;

      if (this.filteredCardListCreatedByUser.length === 0) {
        this.notFoundMessage = "Aucune carte correspondante n'a été trouvée.";
        this.isNoCardFoundPopupDisplay = true;
      }
    } else {
      this.filteredCardListCreatedByUser = [...this.cardListCreatedByUser];
    }
    this.userService.postFilterCardListCreatedByUser(this.filteredCardListCreatedByUser); 
  }


  filterCardsByKilometric() {
    if (this.valueInKilometricInput) {
      this.filteredCardListCreatedByUser = this.cardListCreatedByUser.filter(
        (card: Card) => card.kilometer === this.valueInKilometricInput
      );
      this.isNoCardFoundPopupDisplay = false;

      if (this.filteredCardListCreatedByUser.length === 0) {
        this.notFoundMessage = "Aucune carte correspondante n'a été trouvée.";
        this.isNoCardFoundPopupDisplay = true;
      }
    } else {
      this.filteredCardListCreatedByUser = [...this.cardListCreatedByUser];
    }
    this.userService.postFilterCardListCreatedByUser(this.filteredCardListCreatedByUser); 
  }
  





}
