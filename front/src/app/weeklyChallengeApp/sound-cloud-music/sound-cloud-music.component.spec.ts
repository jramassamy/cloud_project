import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundCloudMusicComponent } from './sound-cloud-music.component';

describe('SoundCloudMusicComponent', () => {
  let component: SoundCloudMusicComponent;
  let fixture: ComponentFixture<SoundCloudMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundCloudMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundCloudMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
