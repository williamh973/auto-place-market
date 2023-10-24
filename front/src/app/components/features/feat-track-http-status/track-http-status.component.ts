import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-track-http-status',
  templateUrl: './track-http-status.component.html',
  styleUrls: ['./track-http-status.component.scss']
})
export class TrackHttpStatusComponent {
  

  httpError$!: Observable<HttpErrorResponse>;
  httpSuccess$!: Observable<HttpResponse<any>>;

  showErrorMessage: boolean = false;
  showSuccessMessage: boolean = false;
  

  constructor(
    public httpS: AuthService
  ) { }


  ngOnInit(): void {
    this.httpError$ = this.httpS.getHttpErrorSubject$();
    this.httpSuccess$ = this.httpS.getHttpSuccessSubject$();
  
    this.httpError$.subscribe((error: HttpErrorResponse) => {
      this.showErrorMessage = true;
    });

    this.httpSuccess$.subscribe((response: HttpResponse<any>) => {
      this.showSuccessMessage = true;

    });
  }

  }

  

