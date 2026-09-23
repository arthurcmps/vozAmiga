import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrincarPage } from './brincar.page';
import { pageProviders } from '../../../testing/providers';

describe('BrincarPage', () => {
  it('renders its screen with resolved dependencies', async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, RouterModule, BrincarPage],

      providers: pageProviders(),
    }).compileComponents();
    const fixture = TestBed.createComponent(BrincarPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ion-title').textContent).toContain('Brincar');
  });
});
