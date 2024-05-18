import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feat-no-cards-found-popup',
  templateUrl: './feat-no-cards-found-popup.component.html',
  styleUrls: ['./feat-no-cards-found-popup.component.scss']
})
export class FeatNoCardsFoundComponent {

  @Input() notFoundMessage!: string;
  
  isNoCardFoundPopupDisplay: boolean = false;

}  