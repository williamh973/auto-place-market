import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-feat-slogan',
  templateUrl: './feat-slogan.component.html',
  styleUrls: ['./feat-slogan.component.scss'
],
animations: [
  trigger('repeatSlogan', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('1s', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('1s', style({ opacity: 0 })),
    ]),
  ]),
],
})
export class FeatSloganComponent {

  slogan: string = "Votre collection de rêve, à portée de clic et à prix exceptionnel !";

  constructor() {
    setInterval(() => {
      this.slogan = "Votre collection de rêve, à portée de clic et à prix exceptionnel !";
    }, 5000);
  }

}
