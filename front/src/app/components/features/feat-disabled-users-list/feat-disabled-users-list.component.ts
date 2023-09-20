import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DbUserService } from 'src/app/shared/services/db-user.service';

@Component({
  selector: 'app-feat-disabled-users-list',
  templateUrl: './feat-disabled-users-list.component.html',
  styleUrls: ['./feat-disabled-users-list.component.scss']
})
export class FeatDisabledUsersListComponent {

 user: User = new User('', '', '', '', false, [], [], [], 'ROLE_USER');

 userDisabledList: User[] = [];


 constructor(private dbUser: DbUserService) {}


 ngOnInit() {
  this.dbUser.getAllUserDisabled().subscribe((userDisabledListFromDatabase: User[]) => {
    this.userDisabledList = userDisabledListFromDatabase
    console.log(this.userDisabledList);
  });  
 }

}
