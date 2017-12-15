import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiriComponent } from './piri.component';

describe('PiriComponent', () => {
  let component: PiriComponent;
  let fixture: ComponentFixture<PiriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
