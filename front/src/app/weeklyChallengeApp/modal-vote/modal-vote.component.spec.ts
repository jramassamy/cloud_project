import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVoteComponent } from './modal-vote.component';

describe('ModalVoteComponent', () => {
  let component: ModalVoteComponent;
  let fixture: ComponentFixture<ModalVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
