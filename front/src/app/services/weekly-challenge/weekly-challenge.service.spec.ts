import { TestBed } from '@angular/core/testing';

import { WeeklyChallengeService } from './weekly-challenge.service';

describe('WeeklyChallengeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeeklyChallengeService = TestBed.get(WeeklyChallengeService);
    expect(service).toBeTruthy();
  });
});
