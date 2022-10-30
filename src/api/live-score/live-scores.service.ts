import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, switchMap, tap } from "rxjs/operators";
import { APIResponse } from "src/core/model/score-feed";
import { timer } from "rxjs";
import { LiveScoreHelper } from "./live-score-helper/live-score-helper.impl";


const SCORE_GET_FEED = "https://www.scorebat.com/api/feed/";
const SCORE_UPDATE_FEED = "https://www.scorebat.com/api/feed/updates";
const SCORE_MATCH_FEED = "https://www.scorebat.com/api/feed/match/";

@Injectable({ providedIn: "root" })
export class LiveScoresService {
  private lastAvailableFeed = null;

  constructor(
    private httpClient: HttpClient,
    private liveScoreHelper: LiveScoreHelper
  ) {}

  getScoresFeed(refreshInterval = 10000) {
      this.httpClient.get<APIResponse<any>>(SCORE_GET_FEED).pipe(
        map(apiResponse => this.liveScoreHelper.parseScoreFeed(apiResponse)),
        tap((feed) => this.lastAvailableFeed = feed),
        switchMap(() => timer(0, refreshInterval)),
        switchMap(() => this.httpClient.get<APIResponse<any>>(SCORE_UPDATE_FEED, {
          params: { _: String(Date.now()), sf: "1" }
        }))
      )
  }
}
