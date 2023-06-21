import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { YoutubeService } from 'src/app/shared/services/youtube.service';

@Component({
  selector: 'app-feat-edit-card-form',
  templateUrl: './feat-edit-card-form.component.html',
  styleUrls: ['./feat-edit-card-form.component.scss']
})
export class FeatEditCardFormComponent {


@Input()
 card: Card = new Card(0, "", "", "", [])

@Input() 
createMode: boolean = false;

@Output() 
isCardEditFormToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
@Output() 
isFormCreateCard: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private youtubeService: YoutubeService) {}
  
 cancelPopup() {
  this.isCardEditFormToggle.emit(false);
  this.isFormCreateCard.emit(false);
 }

  onSubmit() {
    if (this.createMode) {
      this.youtubeService.createCard(this.card).subscribe((createCardFromDatabase: Card) => {
        console.log(createCardFromDatabase);
        window.location.reload();
      });
    } else {
      this.youtubeService.update(this.card).subscribe((updateCardFromDatabase: Card) => {
        console.log(updateCardFromDatabase);
      }) 
    }

  }
}
