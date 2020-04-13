import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastChallengeComponent } from './last-challenge.component';

describe('LastChallengeComponent', () => {
  let component: LastChallengeComponent;
  let fixture: ComponentFixture<LastChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
