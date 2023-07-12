import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-feat-sign-in-status',
  templateUrl: './feat-sign-in-status.component.html',
  styleUrls: ['./feat-sign-in-status.component.scss']
})
export class FeatSignInStatusComponent {
  

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

      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000); 
    });
  }


  }

  

