import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorDashboardHomeComponent } from './moderator-dashboard-home.component';

describe('ModeratorDashboardHomeComponent', () => {
  let component: ModeratorDashboardHomeComponent;
  let fixture: ComponentFixture<ModeratorDashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorDashboardHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
