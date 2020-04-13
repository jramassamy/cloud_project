import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesChallengesComponent } from './liste-des-challenges.component';

describe('ListeDesChallengesComponent', () => {
  let component: ListeDesChallengesComponent;
  let fixture: ComponentFixture<ListeDesChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDesChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDesChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
