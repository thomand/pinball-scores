import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveNewestScoresComponent } from './five-newest-scores.component';

describe('FiveNewestScoresComponent', () => {
  let component: FiveNewestScoresComponent;
  let fixture: ComponentFixture<FiveNewestScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveNewestScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveNewestScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
