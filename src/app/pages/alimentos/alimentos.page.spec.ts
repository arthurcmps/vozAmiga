import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlimentosPage } from './alimentos.page';
import { pageProviders } from '../../../testing/providers';

describe('AlimentosPage', () => {
  it('renders its screen with resolved dependencies', async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, RouterModule, AlimentosPage],

      providers: pageProviders(),
    }).compileComponents();
    const fixture = TestBed.createComponent(AlimentosPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ion-title').textContent).toContain('Alimentos');
  });
});
