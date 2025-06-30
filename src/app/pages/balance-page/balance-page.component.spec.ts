import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancePageComponent } from './balance-page.component';

describe('BalancePageComponent', () => {
  let component: BalancePageComponent;
  let fixture: ComponentFixture<BalancePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalancePageComponent]
    });
    fixture = TestBed.createComponent(BalancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
