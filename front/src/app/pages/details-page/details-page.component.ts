import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CardService } from '../../shared/services/card.service';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  card!: Card;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) { }

  ngOnInit() {
    

    this.route.paramMap.subscribe((params: Params) => {
      const cardId = +params['get']('id');
      
      this.cardService.getCardById(cardId).subscribe(
        (card: Card) => {
          this.card = card;
        },
        (error) => {
          console.log('Erreur lors de la récupération des détails de la carte :', error);
        }
      );
    });
  }

}
