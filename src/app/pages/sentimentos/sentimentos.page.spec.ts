import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SentimentosPage } from './sentimentos.page';
import { pageProviders } from '../../../testing/providers';

describe('SentimentosPage', () => {
  it('renders its screen with resolved dependencies', async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, RouterModule, SentimentosPage],

      providers: pageProviders(),
    }).compileComponents();
    const fixture = TestBed.createComponent(SentimentosPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ion-title').textContent).toContain('Sentimentos');
  });
});
