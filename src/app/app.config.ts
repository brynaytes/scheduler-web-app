import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import route from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(route), provideClientHydration()]
};
