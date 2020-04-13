import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeListAdminTemplateComponent } from './challenge-list-admin-template.component';

describe('ChallengeListAdminTemplateComponent', () => {
  let component: ChallengeListAdminTemplateComponent;
  let fixture: ComponentFixture<ChallengeListAdminTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeListAdminTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeListAdminTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
