import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeCreationAdminComponent } from './challenge-creation-admin.component';

describe('ChallengeCreationAdminComponent', () => {
  let component: ChallengeCreationAdminComponent;
  let fixture: ComponentFixture<ChallengeCreationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeCreationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeCreationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
