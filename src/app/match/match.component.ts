import { IMatchInfo } from './../../shared/model/score-feed';
import { STATS_KEY, EVENT_TYPES } from './../app.constants';
import { switchMap, take, withLatestFrom, tap, takeUntil } from "rxjs/operators";
import { LiveScoresService } from "./../../shared/services/live-scores/live-scores.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, interval, Subscription, timer } from "rxjs";
import { ISideItem } from "src/shared/model/score-feed";
import { Store } from '@ngrx/store';
import { getMatch } from '../state/app.selectors';

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"]
})
export class MatchComponent implements OnInit {
  matchInfo: Observable<any>;
  readonly STATS_KEY = STATS_KEY;
  readonly EVENT_TYPES = EVENT_TYPES;
  private status: string;
  isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private liveScores: LiveScoresService
  ) {}

  ngOnInit() {
    this.matchInfo = this.route.paramMap.pipe(
      withLatestFrom(this.route.queryParamMap),
      switchMap(([params, queryParamMap]) => {
        const team1 = this.parseParam(params.get("team1"));
        const team2 = this.parseParam(params.get("team2"));
        this.status = queryParamMap.get("status");
        if (this.status === 'Live') {
          return this.updateLiveScores(team1, team2);
        } else {
          return this.getLiveScore(team1, team2);
        }
      })
    );
  }

  parseParam(param: string) {
    return param
    .toLowerCase()
    .replace('-', '')
    .split(" ")
    .join("-");
  }

  getLiveScore(teamOne: string, teamTwo: string) {
    return this.liveScores.getMatchLocation(teamOne, teamTwo);
  }

  updateLiveScores(teamOne: string, teamTwo: string) {
  return timer(0, 60000)
    .pipe(
      tap(() => this.isLoaded = true),
      switchMap(() => this.liveScores.getMatchLocation(teamOne, teamTwo))
    );
  }
}
