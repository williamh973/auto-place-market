import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';

@Component({
  selector: 'app-feat-card-list-user',
  templateUrl: './feat-card-list-user.component.html',
  styleUrls: ['./feat-card-list-user.component.scss']
})
export class FeatCardListUserComponent {

  @Input() user!: User;
  @Input() cardListCreatedByUser!: Card[];

  filteredCardListCreatedByUser: Card[] = [];
  

  constructor(
    private dbUser: DbUserService
    ) { }


  ngOnInit() {
    this.dbUser.getUserCards().subscribe((cardListFromDatabase: Card[]) => {
      this.cardListCreatedByUser = cardListFromDatabase;
      });    
      this.dbUser.getFilteredCardListCreatedByUser$().subscribe((newFileteredUserCardList: Card[]) => {
        this.filteredCardListCreatedByUser = newFileteredUserCardList;
        }); 
      }  

}
