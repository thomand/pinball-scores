import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Container6Component } from './container-6.component';

describe('Container6Component', () => {
  let component: Container6Component;
  let fixture: ComponentFixture<Container6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Container6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Container6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
