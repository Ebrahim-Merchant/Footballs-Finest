import { IScoreItem, ITeam, ILeague, IMatchStatus } from '../score-feed';
import { UtilsService } from 'src/shared/services/utils/utils.service';
import { Team } from './team';

export class ScoreItem implements IScoreItem {
  teamOne: ITeam;
  teamTwo: ITeam;
  league: ILeague;
  status: IMatchStatus;
  matchId: number;

  constructor(feedItem: any, competition?: any) {
    this.teamOne = new Team(feedItem.s1Id, feedItem.sc1, feedItem.s1, UtilsService.getLogoURL(feedItem.s1Id));
    this.teamTwo = new Team(feedItem.s2Id, feedItem.sc2, feedItem.s2, UtilsService.getLogoURL(feedItem.s2Id));
    if (competition) {
      this.league = {
        id: feedItem.c,
        name: UtilsService.getLeagueName(competition[feedItem.c].n),
        logo: competition[feedItem.c].fl
      };
    } else if (feedItem.cn) {
      this.league = {
        id: feedItem.c,
        name: UtilsService.getLeagueName(feedItem.cn),
        logo: feedItem.fl,
      };
    }

    this.matchId = feedItem.id;
    const status = UtilsService.getStatus(feedItem.s, feedItem.wh ? feedItem.wh : feedItem.dt);
    this.status = {
      ...status,
      scheduledTime: UtilsService.getScheduledTime(status.whistleTime)
    }
  }

}
