import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-line-up-player-item',
  templateUrl: './line-up-player-item.component.html',
  styleUrls: ['./line-up-player-item.component.scss']
})
export class LineUpPlayerItemComponent implements OnInit {

  @Input() playerName: string;
  @Input() playerNumber: number;
  @Input() playerPosition: string;

  constructor() { }

  ngOnInit() {
  }

}
