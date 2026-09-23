import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CadastroPage } from './cadastro.page';
import { pageProviders } from '../../../testing/providers';

describe('CadastroPage', () => {
  it('renders its screen with resolved dependencies', async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, RouterModule, CadastroPage],

      providers: pageProviders(),
    }).compileComponents();
    const fixture = TestBed.createComponent(CadastroPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ion-title').textContent).toContain('Criar conta');
  });
});
