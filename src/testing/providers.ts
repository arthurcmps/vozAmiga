import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { FavoritosService } from '../app/services/favoritos.service';
import { ConfigService } from '../app/services/config.service';
import { VozService } from '../app/services/voz.service';

export function pageProviders() {
  return [
    provideRouter([]),
    { provide: Auth, useValue: { currentUser: null, authStateReady: async () => undefined } },
    { provide: Firestore, useValue: {} },
    { provide: ConfigService, useValue: { rate: 1, pitch: 1, pictogramSize: 'medio', error: '' } },
    { provide: VozService, useValue: { falar: async () => undefined, parar: async () => undefined } },
    { provide: FavoritosService, useValue: { init: async () => undefined, favoritos$: of([]), estaNosFavoritos: () => false, alternar: async () => undefined } },
  ];
}
