import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-feat-edit-card-form',
  templateUrl: './feat-edit-card-form.component.html',
  styleUrls: ['./feat-edit-card-form.component.scss']
})
export class FeatEditCardFormComponent {


@Input()
 card: Card = new Card(
  0, 
  "", 
  "", 
  "", 
  0 , 
  0 , 
  0 , 
  new User(
    "", 
    "", 
    "", 
    "", 
    [], 
    "ROLE_USER"
    )
  ) 

@Input() 
createMode: boolean = false;

@Output() 
isCardEditFormToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
 
@Output() 
isFormCreateCard: EventEmitter<boolean> = new EventEmitter<boolean>();
 

  constructor(private cardService: CardService) {}
  
 cancelPopup() {
  this.isCardEditFormToggle.emit(false);
  this.isFormCreateCard.emit(false);
 }

  onSubmit() {
    if (this.createMode) {
      this.cardService.createCard(this.card).subscribe((createCardFromDatabase: Card) => {
        console.log(createCardFromDatabase);
        this.isFormCreateCard.emit(false);
        window.location.reload();
      });
    } else {
      this.cardService.updateCard(this.card).subscribe((updateCardFromDatabase: Card) => {
        console.log(updateCardFromDatabase);
        this.isCardEditFormToggle.emit(false);
        window.location.reload();
      }) 
    }

  }
}
