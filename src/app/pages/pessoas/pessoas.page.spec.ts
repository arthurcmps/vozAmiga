import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PessoasPage } from './pessoas.page';
import { pageProviders } from '../../../testing/providers';

describe('PessoasPage', () => {
  it('renders its screen with resolved dependencies', async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, RouterModule, PessoasPage],

      providers: pageProviders(),
    }).compileComponents();
    const fixture = TestBed.createComponent(PessoasPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ion-title').textContent).toContain('Pessoas');
  });
});
