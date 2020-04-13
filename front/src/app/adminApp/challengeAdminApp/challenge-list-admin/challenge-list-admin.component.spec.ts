import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeListAdminComponent } from './challenge-list-admin.component';

describe('ChallengeListAdminComponent', () => {
  let component: ChallengeListAdminComponent;
  let fixture: ComponentFixture<ChallengeListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
