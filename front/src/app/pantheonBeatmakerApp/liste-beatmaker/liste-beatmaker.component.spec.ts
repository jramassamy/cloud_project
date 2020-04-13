import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBeatmakerComponent } from './liste-beatmaker.component';

describe('ListeBeatmakerComponent', () => {
  let component: ListeBeatmakerComponent;
  let fixture: ComponentFixture<ListeBeatmakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListeBeatmakerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeBeatmakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
