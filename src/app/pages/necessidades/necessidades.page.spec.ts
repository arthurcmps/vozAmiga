import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NecessidadesPage } from './necessidades.page';

describe('NecessidadesPage', () => {
  let component: NecessidadesPage;
  let fixture: ComponentFixture<NecessidadesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NecessidadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
