import {
  Component,
  OnInit,
  ChangeDetectorRef,
  HostListener
} from "@angular/core";
import { LiveScoresService } from "./../../shared/services/live-scores/live-scores.service";
import { take, switchMap } from "rxjs/operators";
import { interval, of } from "rxjs";
import { IScoreItem } from "src/shared/model/score-feed";
import * as moment from "moment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  liveScores: IScoreItem[];
  sliceNumber = 28;
  live = false;
  competitions;
  moment = moment;
  filters = [];
  filterList = [
    {id: 1, attr: 'status.statusInfo', value: 'Live', name: 'Live', selected: false},
    {id: 2, attr: 'status.statusInfo', value: 'Scheduled', name: 'Upcoming', selected: false},
    {id: 3, attr: 'league.id', value: 15, name: 'Premier League', selected: false},
    {id: 4, attr: 'league.id', value: 14, name: 'La Liga', selected: false}
  ]

  constructor(
    private liveScoresService: LiveScoresService,
    private cdr: ChangeDetectorRef
  ) { }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      this.sliceNumber =
        this.sliceNumber > this.liveScores.length
          ? this.liveScores.length
          : this.sliceNumber + 10;
    }
  }

  toggleSelected(item) {
    item.selected = !item.selected;
  }

  getScheduledTime(unixTime: number) {
    return moment.unix(unixTime).format('hh:mm');
  }

  filter(liveScores) {
    const filter = this.filterList.filter(filter => filter.selected);
    if (!liveScores || !filter || !(filter.length > 0)) {
      return liveScores;
    }
    const filterList = liveScores.filter(liveScore => {
      let filterVal = false;
      filter.forEach(item => {
        if(item.selected) {
          filterVal = filterVal || this.resolve(item.attr, liveScore) === item.value;
        }
      });
      return filterVal;
    });
    return filterList;
  }

  resolve(path, obj) {
  return path.split('.').reduce((prev, curr) => prev ? prev[curr] : null
  , obj || self);
}



  ngOnInit() {
    this.liveScoresService
      .getLiveScores()
      .pipe(take(1))
      .subscribe(scoreFeed => {
        this.liveScores = scoreFeed;
        // this.nonFilterList = scoreFeed;
      });

    this.liveScoresService.competitions
      .pipe(take(1))
      .subscribe((resp) => console.log(resp));

    interval(60000)
      .pipe(switchMap(() => this.liveScoresService.updateScores(this.liveScores)))
      .subscribe(scoreFeed => {
        this.liveScores = scoreFeed;
        this.cdr.detectChanges();
      });
  }

  getLeagueName(leagueName: string) {
    const indexOf = leagueName.indexOf(':');
    if (indexOf > 0) {
      return leagueName.substring(indexOf + 1);
    }

  }
}
