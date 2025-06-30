import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionesPageComponent } from './habitaciones-page.component';

describe('HabitacionesPageComponent', () => {
  let component: HabitacionesPageComponent;
  let fixture: ComponentFixture<HabitacionesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabitacionesPageComponent]
    });
    fixture = TestBed.createComponent(HabitacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
