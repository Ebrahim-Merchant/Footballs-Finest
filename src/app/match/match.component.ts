import { IMatchInfo } from '../../core/model/score-feed';
import { STATS_KEY, EVENT_TYPES } from './../app.constants';
import { switchMap, withLatestFrom, tap } from "rxjs/operators";
import { LiveScoresService } from "../../core/services/live-scores/live-scores.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, timer } from "rxjs";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"]
})
export class MatchComponent implements OnInit {

  /**
   *
   *
   * @type {Observable<IMatchInfo>}
   * @memberof MatchComponent
   */
  matchInfo: Observable<IMatchInfo>;

  /**
   *
   *
   * @memberof MatchComponent
   */
  readonly STATS_KEY = STATS_KEY;

  /**
   *
   *
   * @memberof MatchComponent
   */
  readonly EVENT_TYPES = EVENT_TYPES;

  /**
   *
   *
   * @private
   * @type {string}
   * @memberof MatchComponent
   */
  private status: string;

  /**
   *
   *
   * @memberof MatchComponent
   */
  isLoaded = false;

  /**
   * Creates an instance of MatchComponent.
   * @param {ActivatedRoute} route
   * @param {LiveScoresService} liveScores
   * @memberof MatchComponent
   */
  constructor(
    private route: ActivatedRoute,
    private liveScores: LiveScoresService
  ) {}

  ngOnInit() {
    this.matchInfo = this.route.paramMap.pipe(
      withLatestFrom(this.route.queryParamMap),
      switchMap(([params, queryParamMap]) => {
        const teamOne = this.parseParam(params.get("team1"));
        const teamTwo = this.parseParam(params.get("team2"));
        this.status = queryParamMap.get("status");
        if (this.status === 'Live') {
          return this.updateLiveScores(teamOne, teamTwo);
        } else {
          return this.getLiveScore(teamOne, teamTwo);
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

  replaceCamel(stat: string) {
    return stat.replace(/([a-z](?=[A-Z]))/g, '$1 ');
  }

  updateLiveScores(teamOne: string, teamTwo: string) {
  return timer(0, 60000)
    .pipe(
      tap(() => this.isLoaded = true),
      switchMap(() => this.liveScores.getMatchLocation(teamOne, teamTwo)),
      tap((data) => console.log(data)
      )
    );
  }
}
