export interface IScoreItem {
  teamOne: ITeam;
  teamTwo: ITeam;
  league: ILeague;
  status: IMatchStatus;
  matchId: number;
}

interface IGeneral {
  name: string;
  logo: string;
}

interface ITeam extends IGeneral {
  id: number;
  score: number;
};

interface ILeague extends IGeneral {
  id: number;
};


interface IMatchStatus {
  status: string;
  statusInfo: string;
  whistleTime: number;
  time?: number;
};
