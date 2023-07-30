import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component {

  @Input() 
  currentStep!: number

  @Input() 
  createMode: boolean = false;

  @Input() 
  card:  Card = new Card(  '',  '',   '',   0,   0,   0,   '',   '',   0,  [],  new User(    '',     '',     '',     '',     [],     [],     'ROLE_USER'    ));


  @Output() 
  forGoToStep2: EventEmitter<void> = new EventEmitter<void>();
  
  @Output() 
  onCloseAllStepsFormEmit: EventEmitter<boolean> = new EventEmitter<boolean>();



    ngOnInit() {
 
    }


    onCancelAllStepsForms() {
      this.onCloseAllStepsFormEmit.emit();
    }


    onGoStep2() {
      if (this.createMode) {
          this.forGoToStep2.emit();
    } else {
        this.forGoToStep2.emit();
      } 
    }
  
}
