import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

constructor(
 private localStorage: LocalStorageService
) {}
  ngOnInit() {
   console.log(localStorage.getItem("favoriteCards"));
   console.log(localStorage.getItem("userEmail")); 
   
  }
}
