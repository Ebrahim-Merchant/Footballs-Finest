import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from 'src/shared/model/score-feed';

@Component({
  selector: 'app-score-team-item',
  templateUrl: './score-team-item.component.html',
  styleUrls: ['./score-team-item.component.scss']
})
export class ScoreTeamItemComponent implements OnInit {

  @Input() team: ITeam;
  constructor() { }

  ngOnInit() { }

}
