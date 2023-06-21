import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-feat-edit-card-form',
  templateUrl: './feat-edit-card-form.component.html',
  styleUrls: ['./feat-edit-card-form.component.scss']
})
export class FeatEditCardFormComponent {

 card: Card = new Card(0, "", "", "", [])

  onSubmit() {

  }
}
