import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPartageComponent } from './modal-partage.component';

describe('ModalPartageComponent', () => {
  let component: ModalPartageComponent;
  let fixture: ComponentFixture<ModalPartageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPartageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPartageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
