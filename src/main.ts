import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(routeConfig),
      provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync()
    ]
  }
).catch(err => console.error(err));

