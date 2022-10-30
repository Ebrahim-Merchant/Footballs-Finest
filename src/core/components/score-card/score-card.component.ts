import { IScoreItem, IMatchStatus } from '../../model/score-feed';
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

  ngOnInit() {  }

}
