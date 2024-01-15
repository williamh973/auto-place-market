import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class TrackHttpStatusService {

    private isTrackHttpStatusSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
    isTrackHttpStatus$ = this.isTrackHttpStatusSubject$.asObservable();
  

    openTrackHttpStatus() {
      this.isTrackHttpStatusSubject$.next(true);
      console.log(this.isTrackHttpStatusSubject$);
    }
  
    closeTrackHttpStatus() {
      this.isTrackHttpStatusSubject$.next(false);
    }

}