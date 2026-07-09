import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient } from '@angular/common/http'; // <-- Asegúrate de tener este import
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient() // <-- Se agrega aquí para que haga match con tu appConfig
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);