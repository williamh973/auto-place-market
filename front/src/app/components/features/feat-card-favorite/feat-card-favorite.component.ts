import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';



@Component({
  selector: 'app-feat-card-favorite',
  templateUrl: './feat-card-favorite.component.html',
  styleUrls: ['./feat-card-favorite.component.scss']
})
export class FeatCardFavoriteComponent {

  @Input() card!: Card

  firstPictureSrc: string = '';

  ngOnInit(): void {
    this.card.picturesList.sort((pictureA, pictureB) => (pictureA.id ?? 0) - (pictureB.id ?? 0));     

    if (this.card.picturesList.length > 0) {
      this.firstPictureSrc = this.card.picturesList[0].src;
    }
  }

}

