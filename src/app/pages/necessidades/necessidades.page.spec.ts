import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NecessidadesPage } from './necessidades.page';
import { pageProviders } from '../../../testing/providers';

describe('NecessidadesPage', () => {
  it('renders its screen with resolved dependencies', async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, RouterModule, NecessidadesPage],

      providers: pageProviders(),
    }).compileComponents();
    const fixture = TestBed.createComponent(NecessidadesPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ion-title').textContent).toContain('Necessidades');
  });
});
