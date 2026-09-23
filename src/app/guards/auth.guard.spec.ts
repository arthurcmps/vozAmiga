import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('waits for persisted authentication before authorizing', async () => {
    let ready!: () => void;
    const auth = { currentUser: null as unknown, authStateReady: () => new Promise<void>(resolve => { ready = resolve; }) };
    const router = jasmine.createSpyObj<Router>('Router', ['createUrlTree']);
    const result = new AuthGuard(auth as Auth, router).canActivate();
    expect(router.createUrlTree).not.toHaveBeenCalled();
    auth.currentUser = { uid: 'test-user' }; ready();
    expect(await result).toBeTrue();
  });
  it('returns a redirect for unauthenticated visitors', async () => {
    const router = jasmine.createSpyObj<Router>('Router', ['createUrlTree']);
    const redirect = {} as any; router.createUrlTree.and.returnValue(redirect);
    const auth = { currentUser: null, authStateReady: async () => undefined } as unknown as Auth;
    expect(await new AuthGuard(auth, router).canActivate()).toBe(redirect);
    expect(router.createUrlTree).toHaveBeenCalledWith(['/home']);
  });
});
