import { TestBed, async, inject } from '@angular/core/testing';

import { RedirectGuardGuard } from './redirect-guard.guard';

describe('RedirectGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectGuardGuard]
    });
  });

  it('should ...', inject([RedirectGuardGuard], (guard: RedirectGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
