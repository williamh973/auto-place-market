import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { FavoriteStatusService } from 'src/app/shared/services/favorite-status.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  favoriteCards: number[] = [];
  
constructor(
  private favoriteStatusService: FavoriteStatusService,
) {}


  ngOnInit() {
      this.favoriteStatusService.getFavoriteCardsSubject$().subscribe((favoriteCards) => {
        this.favoriteCards = favoriteCards;
      });
}

}
