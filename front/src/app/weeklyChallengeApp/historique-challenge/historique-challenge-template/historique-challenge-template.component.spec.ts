import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueChallengeTemplateComponent } from './historique-challenge-template.component';

describe('HistoriqueChallengeTemplateComponent', () => {
  let component: HistoriqueChallengeTemplateComponent;
  let fixture: ComponentFixture<HistoriqueChallengeTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueChallengeTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueChallengeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
