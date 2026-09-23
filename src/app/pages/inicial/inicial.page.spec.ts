import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InicialPage } from './inicial.page';
import { pageProviders } from '../../../testing/providers';

describe('InicialPage', () => {
  it('renders its screen with resolved dependencies', async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, RouterModule],
      declarations: [InicialPage],
      providers: pageProviders(),
    }).compileComponents();
    const fixture = TestBed.createComponent(InicialPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ion-title').textContent).toContain('O que você quer dizer?');
  });
});
