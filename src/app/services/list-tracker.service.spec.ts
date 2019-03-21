import { TestBed } from '@angular/core/testing';

import { ListTrackerService } from './list-tracker.service';

describe('ListTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListTrackerService = TestBed.get(ListTrackerService);
    expect(service).toBeTruthy();
  });
});
