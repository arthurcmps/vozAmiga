import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritosPage } from './favoritos.page';
import { pageProviders } from '../../../testing/providers';

describe('FavoritosPage', () => {
  it('renders its screen with resolved dependencies', async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, RouterModule],
      declarations: [FavoritosPage],
      providers: pageProviders(),
    }).compileComponents();
    const fixture = TestBed.createComponent(FavoritosPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ion-title').textContent).toContain('Favoritos');
  });
});
