import { ITeam } from '../score-feed';

export class Team implements ITeam {
  id: number;
  score: number;
  name: string;
  logo: string;

  constructor(id: number, score: number, name: string, logo: string) {
    this.id = id;
    this.score = score;
    this.name = name;
    this.logo = logo;
  }
}
