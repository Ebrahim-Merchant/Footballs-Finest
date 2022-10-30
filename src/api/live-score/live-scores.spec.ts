/* tslint:disable:no-unused-variable */

import { HttpClient } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { LiveScoresService } from './live-scores.service';

fdescribe('Service: LiveScores', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiveScoresService, HttpClient]
    });
  });

  it('should ...', inject([LiveScoresService], (service: LiveScoresService) => {
    expect(service).toBeTruthy();
  }));
});
