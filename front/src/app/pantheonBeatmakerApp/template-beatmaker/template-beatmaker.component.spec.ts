import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateBeatmakerComponent } from './template-beatmaker.component';

describe('TemplateBeatmakerComponent', () => {
  let component: TemplateBeatmakerComponent;
  let fixture: ComponentFixture<TemplateBeatmakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateBeatmakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateBeatmakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
