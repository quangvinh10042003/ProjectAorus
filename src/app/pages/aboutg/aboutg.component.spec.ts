import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutgComponent } from './aboutg.component';

describe('AboutgComponent', () => {
  let component: AboutgComponent;
  let fixture: ComponentFixture<AboutgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
