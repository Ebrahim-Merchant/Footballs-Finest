import { ILineUpItem } from '../score-feed';

export class LineUpItem implements ILineUpItem {
  positionNumber: string;
  position: string;
  name: string;

  constructor(name: string, positionNumber: string, position: string) {
    this.name = name;
    this.position = position;
    this.positionNumber = positionNumber;
  }
}
