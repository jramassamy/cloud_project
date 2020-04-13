import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextChallengeComponent } from './next-challenge.component';

describe('NextChallengeComponent', () => {
  let component: NextChallengeComponent;
  let fixture: ComponentFixture<NextChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
