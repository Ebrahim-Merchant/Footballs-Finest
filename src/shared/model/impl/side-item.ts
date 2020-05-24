import { ISideItem, ILineUpItem } from '../score-feed';

export class SideItem implements ISideItem {
  name: string;
  formation: string;
  lineup: ILineUpItem[];
  bench: ILineUpItem[];
  substitutes: any;
  constructor(side: string, formation: string, lineUp: Array<any>, bench: Array<any>) {
    this.name = side;
    this.formation = formation;
    this.lineup = lineUp.map(player => {
      return {
        name: player.n,
        positionNumber: player.nm,
        position: player.ps
      };
    });

    this.bench = bench.map(player => ({
        name: player.n,
        positionNumber: player.nm,
        position: player.ps
      }
    ));
  }
}
