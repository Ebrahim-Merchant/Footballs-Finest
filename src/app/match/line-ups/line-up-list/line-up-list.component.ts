import { Component, OnInit, Input } from '@angular/core';
import { SideItem } from 'src/shared/model/impl/side-item';
import { ILineUpItem } from 'src/shared/model/score-feed';

@Component({
  selector: 'app-line-up-list',
  templateUrl: './line-up-list.component.html',
  styleUrls: ['./line-up-list.component.scss']
})
export class LineUpListComponent implements OnInit {

  @Input() heading: string;
  @Input() players: Array<ILineUpItem>;

  constructor() { }

  ngOnInit() {
  }

}
