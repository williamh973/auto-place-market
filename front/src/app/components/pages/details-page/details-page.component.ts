import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CardService } from '../../../shared/services/card.service';
import { Card } from '../../../models/card.model';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  card!: Card;

  firstPictureSrc: string = '';

  currentIndex: number = 0;


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

          this.card.picturesList.sort((pictureA, pictureB) => (pictureA.id ?? 0) - (pictureB.id ?? 0));   

          if (this.card.picturesList.length > 0) {
            this.firstPictureSrc = this.card.picturesList[0].src;
          }
        },
        (error) => {
          console.log('Erreur lors de la récupération des détails de la carte :', error);
        }
      );
    });
    
  }


  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.card.picturesList.length;
    this.firstPictureSrc = this.card.picturesList[this.currentIndex].src;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.card.picturesList.length) % this.card.picturesList.length;
    this.firstPictureSrc = this.card.picturesList[this.currentIndex].src;
  }


}
