import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';
import { YoutubeService } from 'src/app/shared/services/youtube.service';



@Component({
  selector: 'app-feat-card-list',
  templateUrl: './feat-card-list.component.html',
  styleUrls: ['./feat-card-list.component.scss']
})
export class FeatCardListComponent {


  cardList: Card[] = [];
  filteredCardList: Card[] = [];

  constructor(private youtubeService: YoutubeService) { }
  

   
  ngOnInit(): void {

    this.youtubeService.getCardList().subscribe((cardListFromDatabase: Card[]) => {
    this.cardList = cardListFromDatabase;
      }) 

 
    this.youtubeService.getFilteredCardList$().subscribe((newFileteredCardList: Card[]) => {
      this.filteredCardList = newFileteredCardList;
    });
    
   
    
  }
}
