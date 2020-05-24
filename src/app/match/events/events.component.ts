import { Component, OnInit, Input } from '@angular/core';
import { EVENT_TYPES } from 'src/app/app.constants';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  @Input() events;
  readonly EVENT_TYPES = EVENT_TYPES;

  constructor() { }

  ngOnInit() {}

}
