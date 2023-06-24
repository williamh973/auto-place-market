import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-track-token-state',
  templateUrl: './track-token-state.component.html',
  styleUrls: ['./track-token-state.component.scss']
})
export class TrackTokenStateComponent implements OnInit {

  // Ce composant sert uniquement à afficher le corps du nouveau token reçu 

  tokenDetailsSubject$!: Observable<any>;

  constructor(
    private tokenS: TokenService,
    private lsService: LocalStorageService) { }

  ngOnInit(): void {
    this.tokenDetailsSubject$ = this.tokenS._getTokenDetailsSubject$()
  }


  clearToken(): void {
    this.lsService.clearToken();
    this.tokenS.resetToken();
  }

}
