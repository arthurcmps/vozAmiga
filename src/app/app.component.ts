import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false,
})
export class AppComponent {
  constructor(private router: Router) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // Bloqueia redirecionamento automático se a flag estiver ativada
      if (environment.bloquearAutoLogin) return;

      if (user) {
        this.router.navigate(['/inicial']);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}