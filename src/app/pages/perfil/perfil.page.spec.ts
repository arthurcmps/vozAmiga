import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfilPage } from './perfil.page';
import { pageProviders } from '../../../testing/providers';

describe('PerfilPage', () => {
  it('renders its screen with resolved dependencies', async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, RouterModule, PerfilPage],

      providers: pageProviders(),
    }).compileComponents();
    const fixture = TestBed.createComponent(PerfilPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ion-title').textContent).toContain('Meu perfil');
  });
});
