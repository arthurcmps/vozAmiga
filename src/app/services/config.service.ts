import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // Valores padrão
  public rate: number = 1.0;
  public pitch: number = 1.0;
  public pictogramSize: string = 'medio';

  constructor(private firestore: Firestore) {
    this.loadConfig();
  }

  loadConfig() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(this.firestore, `usuarios/${user.uid}`);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const dados = snap.data();
          this.rate = dados['rate'] ?? 1.0;
          this.pitch = dados['pitch'] ?? 1.0;
          this.pictogramSize = dados['pictogramSize'] ?? 'medio';
        }
      } else {
        // Resetar para os padrões se o usuário fizer logout
        this.rate = 1.0;
        this.pitch = 1.0;
        this.pictogramSize = 'medio';
      }
    });
  }
}
