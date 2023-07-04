import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-track-http-status',
  templateUrl: './track-http-status.component.html',
  styleUrls: ['./track-http-status.component.scss']
})
export class TrackHttpStatusComponent implements OnInit {

  httpError$!: Observable<HttpErrorResponse>;
  httpSuccess$!: Observable<HttpResponse<any>>;

  constructor(
    public httpS: AuthService,
  ) { }

  ngOnInit(): void {
    this.httpError$ = this.httpS.getHttpErrorSubject$();
    this.httpSuccess$ = this.httpS.getHttpSuccessSubject$();
  }

  
}
