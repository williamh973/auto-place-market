import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-feat-register-status',
  templateUrl: './feat-register-status.component.html',
  styleUrls: ['./feat-register-status.component.scss']
})
export class FeatRegisterStatusComponent {

  httpError$!: Observable<HttpErrorResponse>;
  httpSuccess$!: Observable<HttpResponse<any>>;

  showErrorMessage: boolean = false;
  showSuccessMessage: boolean = false;


  constructor(
    private httpS: AuthService
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
