/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LiveScoresService } from './live-scores.service';

describe('Service: LiveScores', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiveScoresService]
    });
  });

  it('should ...', inject([LiveScoresService], (service: LiveScoresService) => {
    expect(service).toBeTruthy();
  }));
});
