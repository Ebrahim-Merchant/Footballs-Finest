import { IScoreItem, IMatchStatus } from './../../model/score-feed';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from "moment";

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent implements OnInit {

  @Input() scoreItem: IScoreItem;
  @Input() fullWidth = false;


  constructor() { }

  ngOnInit() {
  }

  getLeagueName(leagueName: string) {
    const indexOf = leagueName.indexOf(':');
    if (indexOf > 0) {
      return leagueName.substring(indexOf + 1);
    }
  }

  getScheduledTime(unixTime: number) {
    return moment.unix(unixTime).format('hh:mm');
  }
}
