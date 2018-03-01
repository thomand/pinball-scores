import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineUserChartComponent } from './machine-user-chart.component';

describe('MachineUserChartComponent', () => {
  let component: MachineUserChartComponent;
  let fixture: ComponentFixture<MachineUserChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineUserChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineUserChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
