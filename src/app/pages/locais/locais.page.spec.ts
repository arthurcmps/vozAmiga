import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocaisPage } from './locais.page';
import { pageProviders } from '../../../testing/providers';

describe('LocaisPage', () => {
  it('renders its screen with resolved dependencies', async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, RouterModule, LocaisPage],

      providers: pageProviders(),
    }).compileComponents();
    const fixture = TestBed.createComponent(LocaisPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ion-title').textContent).toContain('Locais');
  });
});
