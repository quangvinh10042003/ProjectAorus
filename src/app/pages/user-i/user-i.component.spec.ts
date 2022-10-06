import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIComponent } from './user-i.component';

describe('UserIComponent', () => {
  let component: UserIComponent;
  let fixture: ComponentFixture<UserIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
