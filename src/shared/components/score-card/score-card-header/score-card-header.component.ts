import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score-card-header',
  templateUrl: './score-card-header.component.html',
  styleUrls: ['./score-card-header.component.scss']
})
export class ScoreCardHeaderComponent implements OnInit {

  @Input() league;
  @Input() status;

  constructor() { }

  ngOnInit() {
  }

}
