import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    await this.auth.authStateReady();
    return this.auth.currentUser ? true : this.router.createUrlTree(['/home']);
  }
}
