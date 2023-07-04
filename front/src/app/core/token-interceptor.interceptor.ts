import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private authS: AuthService,
    private lsService: LocalStorageService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // On récupère le token du localStorage
    const idToken = this.lsService.getToken();

    if (idToken) {
      // Je crée le header ajouté à chaque requête HTTP envoyée vers le serveur
      const cloned = request.clone({
        headers: request.headers.set(
          "Authorization",
          "Bearer " + idToken
        )
      });

      return this.mapStream(cloned, next);
    } else {
      return  this.mapStream(request, next);
       
    }
  }

  mapStream(request: HttpRequest<unknown>, next: HttpHandler):  Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      tap(incomingRequest => {
        console.log(incomingRequest);
        // j'intercepte les requêtes que mon serveur me renvoie en statut 200 (Statut : succès)
        if (incomingRequest instanceof HttpResponse) {
          this.authS.setHttpSuccessSubject$(incomingRequest);
        }
      }),
      // J'intercepte les requêtes que mon serveur me renvoit en statut 400 (Statut : erreur)
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        this.authS.setHttpErrorSubject$(err);
        return throwError(() => new Error("Une erreur est survenue"));
      })
    )
  }
}


