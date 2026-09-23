import { Injectable, OnDestroy } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore';

export interface Preferencias {
  rate: number;
  pitch: number;
  pictogramSize: 'pequeno' | 'medio' | 'grande';
}
export const PADRAO: Preferencias = { rate: 1, pitch: 1, pictogramSize: 'medio' };
export function normalizarPreferencias(data: Partial<Preferencias>): Preferencias {
  const limitar = (value: unknown): number => typeof value === 'number' && Number.isFinite(value)
    ? Math.max(0.5, Math.min(2, value)) : 1;
  return {
    rate: limitar(data.rate), pitch: limitar(data.pitch),
    pictogramSize: data.pictogramSize === 'pequeno' || data.pictogramSize === 'grande'
      ? data.pictogramSize : 'medio',
  };
}

@Injectable({ providedIn: 'root' })
export class ConfigService implements OnDestroy {
  private preferencias = { ...PADRAO };
  private stopAuth: Unsubscribe;
  private stopProfile?: Unsubscribe;
  private generation = 0;
  error = '';
  get rate(): number { return this.preferencias.rate; }
  get pitch(): number { return this.preferencias.pitch; }
  get pictogramSize(): Preferencias['pictogramSize'] { return this.preferencias.pictogramSize; }

  constructor(private auth: Auth, private firestore: Firestore) {
    this.stopAuth = onAuthStateChanged(auth, user => {
      const generation = ++this.generation;
      this.stopProfile?.();
      this.preferencias = { ...PADRAO };
      this.error = '';
      if (user) {
        this.stopProfile = onSnapshot(doc(this.firestore, `usuarios/${user.uid}`), snapshot => {
          if (generation === this.generation) {
            this.aplicar(snapshot.data() ?? {});
            this.error = '';
          }
        }, () => {
          if (generation === this.generation) this.error = 'Preferências indisponíveis. Usando as configurações locais desta sessão.';
        });
      }
    });
  }

  aplicar(data: Partial<Preferencias>): void { this.preferencias = normalizarPreferencias(data); }
  ngOnDestroy(): void { this.generation++; this.stopProfile?.(); this.stopAuth(); }
}
