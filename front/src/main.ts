import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import { initializeApp } from 'firebase/app';
import { environment } from './environments/environment';

const app = initializeApp(environment.firebaseConfig);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


