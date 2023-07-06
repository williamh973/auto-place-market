import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  firstname!: string;

  constructor( private authService: AuthService ) {}

  // ngOnInit() {
  //   this.authService.getUserFirstname().subscribe(
  //     (firstname: string) => {
  //       this.firstname = firstname;
  //     });
  // }

}
