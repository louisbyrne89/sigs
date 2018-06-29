import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRoofListComponent } from './map-roof-list.component';

describe('MapRoofListComponent', () => {
  let component: MapRoofListComponent;
  let fixture: ComponentFixture<MapRoofListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRoofListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRoofListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
