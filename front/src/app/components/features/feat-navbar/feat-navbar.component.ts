import { Component } from '@angular/core';

@Component({
  selector: 'app-feat-navbar',
  templateUrl: './feat-navbar.component.html',
  styleUrls: ['./feat-navbar.component.scss']
})
export class FeatNavbarComponent {

  isRegisterFormOpen: boolean = false;


  OpenRegisterForm() {
    this.isRegisterFormOpen = true;
  }


}
