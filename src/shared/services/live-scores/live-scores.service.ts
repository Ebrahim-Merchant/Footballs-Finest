import { Store } from '@ngrx/store';
import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, withLatestFrom } from "rxjs/operators";
import { IScoreItem, APIResponse, IEvent, IMatchInfo } from "./../../model/score-feed";
import { UtilsService } from "./../utils/utils.service";
import { ScoreItem } from "src/shared/model/impl/score-item";
import { SideItem } from "src/shared/model/impl/side-item";
import { getGamesState } from 'src/app/state/app.selectors';

@Injectable({
  providedIn: "root"
})
export class LiveScoresService {
  constructor(
    private http: HttpClient,
    private store: Store) {}

  competitions: EventEmitter<any> = new EventEmitter();

  private SCORE_GET_FEED = "https://www.scorebat.com/api/feed/";
  private SCORE_UPDATE_FEED = "https://www.scorebat.com/api/feed/updates";
  private SCORE_MATCH_FEED = "https://www.scorebat.com/api/feed/match/";

  getLiveScores() {
    return this.http
      .get<any>(this.SCORE_GET_FEED)
      .pipe(
        map(
          responseData =>
            this.formatFeedData(responseData.response)
        )
      );
  }

  updateScores() {
    return this.http
      .get<any>(this.SCORE_UPDATE_FEED, {
        params: { _: String(Date.now()), sf: "1" }
      })
      .pipe(
        withLatestFrom(this.store.select(getGamesState)),
        map(([responseData, feed]) =>
          this.formatUpdateData(feed, responseData.response.g)
        )
      );
  }

  formatFeedData(feed) {
    if (feed) {
      const competition = feed.c;
      const games = feed.g;
      const scores = [];
      games
        .sort((gameOne, gameTwo) => (gameOne.c > gameTwo.c ? gameOne : gameTwo))
        .map(feedItem => {
          const leagueData = {
            id: competition[feedItem.c].cId,
            name: competition[feedItem.c].n
          };
          scores.push(new ScoreItem(feedItem, competition));
        });
      return {scores, competition};
    }
  }

  formatUpdateData(feed: IScoreItem[], updatedFeed: any) {
    feed = JSON.parse(JSON.stringify(feed));
    feed.map(scoreItem => {
      const updatedScoreItem = updatedFeed[scoreItem.matchId];
      if (updatedFeed && updatedScoreItem) {
        scoreItem.teamOne.score = updatedScoreItem.sc1;
        scoreItem.teamTwo.score = updatedScoreItem.sc2;
        scoreItem.status = UtilsService.getStatus(
          updatedScoreItem.s,
          updatedScoreItem.wh
        );
      } else if (scoreItem.status.statusInfo === "Live") {
        scoreItem.status = UtilsService.getStatus(
          scoreItem.status.status,
          scoreItem.status.whistleTime
        );
      }
    });
    return feed;
  }

  getMatchLocation(teamOne: string, teamTwo: string) {
    return this.http
      .get<APIResponse<any>>(this.SCORE_MATCH_FEED + `${teamOne}/${teamTwo}`)
      .pipe(
        map(res => {
          const matchInfo = res.response;
          const sideOne = new SideItem(
            matchInfo.s1,
            matchInfo.f1,
            matchInfo.l1,
            matchInfo.b1
          );
          const sideTwo = new SideItem(
            matchInfo.s2,
            matchInfo.f2,
            matchInfo.l2,
            matchInfo.b2
          );
          const events: Array<IEvent> = res.response.ev.map((event) => ({
            playerName: event.n,
            type: event.t,
            side: event.s,
            minute: event.m,
            playerId: event.id,
            cardCount: event.ct
          }));

          const stats = res.response.st.map((statItem) => ({
             statKey: statItem.k,
             sideOneStat: statItem.v1,
             sideTwoStat: statItem.v2
          }));

          return {
            score: new ScoreItem(matchInfo),
            sides: [sideOne, sideTwo],
            events,
            stats
          };
        })
      );
  }
}
