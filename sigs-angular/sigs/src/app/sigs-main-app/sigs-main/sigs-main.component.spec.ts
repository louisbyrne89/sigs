import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigsMainComponent } from './sigs-main.component';

describe('SigsMainComponent', () => {
  let component: SigsMainComponent;
  let fixture: ComponentFixture<SigsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
