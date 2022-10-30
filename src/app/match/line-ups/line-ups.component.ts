import { Component, OnInit, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { ISideItem } from 'src/core/model/score-feed';
import { SideItem } from '../../../core/model/impl/side-item';

@Component({
  selector: 'app-line-ups',
  templateUrl: './line-ups.component.html',
  styleUrls: ['./line-ups.component.scss']
})

export class LineUpsComponent{

  @Input() sides: ISideItem[];

  constructor() {}

}
