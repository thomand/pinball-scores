import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterButtonsComponent } from './register-buttons.component';

describe('RegisterButtonsComponent', () => {
  let component: RegisterButtonsComponent;
  let fixture: ComponentFixture<RegisterButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
