import { Component, OnInit } from '@angular/core';
import { DbUserService } from '../shared/services/db-user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-get-datas',
  templateUrl: './get-datas.component.html',
  styleUrls: ['./get-datas.component.scss']
})
export class GetDatasComponent implements OnInit {

  userEmailToGet: string = "";
  userFechted$!: Observable<User>;
  allUsersFetched$!: Observable<User[]>;

  constructor(private dbUser: DbUserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userFechted$ = this.dbUser.getOneUser(this.userEmailToGet);
  }

  getAllUsers(): void {
    this.allUsersFetched$ = this.dbUser.getAllUsers();
  }

}
