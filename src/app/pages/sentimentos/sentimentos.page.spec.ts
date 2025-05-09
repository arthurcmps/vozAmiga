import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SentimentosPage } from './sentimentos.page';

describe('SentimentosPage', () => {
  let component: SentimentosPage;
  let fixture: ComponentFixture<SentimentosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
