import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HonoredBeatmakerComponent } from './honored-beatmaker.component';

describe('HonoredBeatmakerComponent', () => {
  let component: HonoredBeatmakerComponent;
  let fixture: ComponentFixture<HonoredBeatmakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HonoredBeatmakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HonoredBeatmakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
