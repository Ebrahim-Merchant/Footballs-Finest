import { ScoreItem } from './impl/score-item';
import { SideItem } from './impl/side-item';

export interface IScoreItem {
  teamOne: ITeam;
  teamTwo: ITeam;
  league: ILeague;
  status: IMatchStatus;
  matchId: number;
}

export interface IGeneral {
  name: string;
  logo: string;
}

export interface ITeam extends IGeneral {
  id: number;
  score: number;
}

export interface ILeague extends IGeneral {
  id: number;
}

export interface IMatchStatus {
  status: string;
  statusInfo: string;
  whistleTime: number;
  time?: number;
  scheduledTime?: string;
}

export interface IMatchData extends IScoreItem {
  sides: ISideItem[];
  events: IEvent;
  stats: any;
}

export interface IEvent {
  name: string;
  type: string;
  minute: string;
  playerId: number;
  side: number;
}

export interface ISideItem {
  name: string;
  formation: string;
  lineup: ILineUpItem[];
  bench: ILineUpItem[];
}

export interface ILineUpItem {
  name: string;
  positionNumber: string;
  position: string;
}

export interface APIResponse<T> {
  error: [];
  currentTime: number;
  response: T;
}

export interface IMatchInfo {
  score: ScoreItem;
  sides: SideItem[];
  events: IEvent[];
  stats: any;
}
