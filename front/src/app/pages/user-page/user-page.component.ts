import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  firstname!: String;
  lastname!: String;
 

  constructor( 
    private dbUser: DbUserService ) {}



    ngOnInit() {
      this.dbUser.getUserFirstnameForUserPage().subscribe(
        (firstname: string) => {
          this.firstname = firstname;
        },
        (error: any) => {
          console.log('Error occurred:', error);
          console.log('Error message:', error.message);
          console.log('Error response:', error.error);
        }
      );

      this.dbUser.getUserLastnameForUserPage().subscribe(
        (lastname: string) => {
          this.lastname = lastname;
        },
        (error: any) => {
          console.log('Error occurred:', error);
          console.log('Error message:', error.message);
          console.log('Error response:', error.error);
        }
      );
    }





}
