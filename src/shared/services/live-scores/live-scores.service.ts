import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as moment from "moment";
import { IScoreItem } from './../../model/score-feed';


@Injectable({
  providedIn: "root"
})
export class LiveScoresService {
  constructor(private http: HttpClient) {}

  competitions: EventEmitter<any> = new EventEmitter();

  private SCORE_GET_FEED = "https://www.scorebat.com/api/feed/";
  private SCORE_UPDATE_FEED = "https://www.scorebat.com/api/feed/updates";


  getLiveScores() {
    return this.http
      .get<any>(this.SCORE_GET_FEED)
      .pipe(map(responseData => this.formatFeedData(responseData.response) as IScoreItem[]));
  }

  updateScores(feed: IScoreItem[]) {
    return this.http
      .get<any>(this.SCORE_UPDATE_FEED, { params: {_ : String(Date.now()), sf: "1"}})
      .pipe(map(responseData => this.formatUpdateData(feed, responseData.response.g)));
  }

  formatFeedData(feed) {
    if (feed) {
      const competition = feed.c;
      const games = feed.g;
      const scores = [];
      const competitions = new Set();
      games
      .sort((obj1, obj2) => (obj1.c > obj2.c ? obj1 : obj2))
      .map(feedItem => {
        const leagueData = {
          id: feedItem.c,
          name: competition[feedItem.c].n,
        };
        if(!competitions.has(leagueData.id)) {
          competitions.add(leagueData);
        }
        scores.push({
          teamOne: {
            id: feedItem.s1Id,
            name: feedItem.s1,
            logo: this.getLogoURL(feedItem.s1Id),
            score: feedItem.sc1,
          },
          teamTwo: {
            id: feedItem.s2Id,
            name: feedItem.s2,
            logo: this.getLogoURL(feedItem.s2Id),
            score: feedItem.sc2
          },
          league: {
            id: feedItem.c,
            name: competition[feedItem.c].n,
            logo: competition[feedItem.c].fl
          },
          matchId: feedItem.id,
          status: this.getStatus(feedItem.s, feedItem.wh ? feedItem.wh : feedItem.dt)
        });
      });
      this.competitions.emit(competitions);
      return scores;
    }
  }

  formatUpdateData(feed: IScoreItem[], updatedFeed: any) {
    feed.map(scoreItem => {
      const updatedScoreItem = updatedFeed[scoreItem.matchId];
      if (updatedFeed && updatedScoreItem) {
        scoreItem.teamOne.score = updatedScoreItem.sc1;
        scoreItem.teamTwo.score = updatedScoreItem.sc2;
        scoreItem.status = this.getStatus(updatedScoreItem.s, updatedScoreItem.wh);
      } else if (scoreItem.status.statusInfo === "Live") {
        scoreItem.status = this.getStatus(scoreItem.status.status, scoreItem.status.whistleTime);
      }
    });
    return feed;
  }

  private getLogoURL(teamId) {
    return `https://s3.amazonaws.com/bookmkrs/img/logos/mini/${teamId}.png`;
  }


  private parseStatus = statusStr => {
    switch (statusStr) {
      case "-":
      case "":
        return "Scheduled";
      case "NIY":
        return "niy";
      case "1T":
      case "2T":
      case "HT":
      case "ET":
      case "11M":
        return "Live";
      case "FT":
      case "AET":
      case "Pen":
      case "FT":
      case "Res":
      case "AW":
        return "Ended";
      case "Canc":
      case "Pst":
        return "Cancelled";
      case "Ssp":
      case "Susp":
        return "Suspended";
    }
    return "";
  };

  getStatus(status: string,  whistleTimeUnix: number) {
    const statusInfo = this.parseStatus(status);
    if (whistleTimeUnix && statusInfo === "Live") {
      const whistleTime = moment.unix(whistleTimeUnix);
      const diffMinutes = moment().diff(whistleTime, "minute");
      return { status, time: diffMinutes, statusInfo, whistleTime: whistleTimeUnix };
    }
    return {
      status,
      statusInfo,
      whistleTime: whistleTimeUnix
    };
  }
}
