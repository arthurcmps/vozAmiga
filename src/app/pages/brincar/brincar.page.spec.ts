import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrincarPage } from './brincar.page';

describe('BrincarPage', () => {
  let component: BrincarPage;
  let fixture: ComponentFixture<BrincarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BrincarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
