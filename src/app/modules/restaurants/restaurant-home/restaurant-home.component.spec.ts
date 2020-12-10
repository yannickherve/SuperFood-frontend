import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantHomeComponent } from './restaurant-home.component';

describe('RestaurantHomeComponent', () => {
  let component: RestaurantHomeComponent;
  let fixture: ComponentFixture<RestaurantHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
