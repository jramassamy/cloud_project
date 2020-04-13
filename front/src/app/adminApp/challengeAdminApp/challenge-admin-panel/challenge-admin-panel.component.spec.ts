import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeAdminPanelComponent } from './challenge-admin-panel.component';

describe('ChallengeAdminPanelComponent', () => {
  let component: ChallengeAdminPanelComponent;
  let fixture: ComponentFixture<ChallengeAdminPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeAdminPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
