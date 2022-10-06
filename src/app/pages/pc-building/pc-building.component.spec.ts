import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcBuildingComponent } from './pc-building.component';

describe('PcBuildingComponent', () => {
  let component: PcBuildingComponent;
  let fixture: ComponentFixture<PcBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcBuildingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
