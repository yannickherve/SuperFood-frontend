import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreEntryComponent } from './core-entry.component';

describe('CoreEntryComponent', () => {
  let component: CoreEntryComponent;
  let fixture: ComponentFixture<CoreEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
