import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-feat-edit-card-form',
  templateUrl: './feat-edit-card-form.component.html',
  styleUrls: ['./feat-edit-card-form.component.scss']
})
export class FeatEditCardFormComponent {


@Input() 
card:  Card = new Card(
  '',
  '', 
  '', 
  0, 
  0, 
  0, 
  '', 
  '', 
  0,
  new Date(),
  [],
  new User(
    '', 
    '', 
    '', 
    '',
    false, 
    [], 
    [], 
    [], 
    'ROLE_USER'
    )
);

@Input() 
createMode: boolean = false;

@Output() 
onCloseEditCardFormEmit: EventEmitter<boolean> = new EventEmitter<boolean>();


currentStep: number = 1;

isStepsFormsOpen: boolean = true;




  onRecevedMethodForGoToStep2() {
    this.currentStep = 2;
  }

  onRecevedMethodForGoToStep1() {
    this.currentStep = 1;
  }

  onRecevedMethodForCloseAllSteps(isStepsFormsOpen: boolean) {
    this.isStepsFormsOpen = isStepsFormsOpen;
    this.onCloseEditCardFormEmit.emit();
  }

}
