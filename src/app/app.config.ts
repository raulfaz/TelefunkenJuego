import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; // Incluye provideHttpClient
import { RoomService } from './services/room.service'; // Importa RoomService

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // Asegúrate de incluir provideHttpClient
    RoomService // Registra RoomService como proveedor
  ]
};
