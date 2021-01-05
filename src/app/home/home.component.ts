import { getCompetitions } from 'src/app/state/app.selectors';
import { HomeService, IFilterItem } from './home.service';
import {
  Component,
  OnInit,
  HostListener,
  ViewChild
} from "@angular/core";
import { LiveScoresService } from "src/shared/services/live-scores/live-scores.service";
import { switchMap, map, mergeMap } from "rxjs/operators";
import { Observable, timer } from "rxjs";
import { IScoreItem } from "src/shared/model/score-feed";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl } from '@angular/forms';
import { COMMA } from '@angular/cdk/keycodes';
import { ElementRef } from '@angular/core';



@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  liveScores: Observable<IScoreItem[]>;
  length: number;
  competitionList$: Observable<Array<IFilterItem>>;
  competitionList: Array<IFilterItem> = [];
  competitionListSelected: Observable<Array<IFilterItem>>;
  sliceNumber = 28;
  live = false;
  competitionsForm;
  separatorKeysCodes: number[] = [COMMA];
  leagueInput = new FormControl();
  @ViewChild('leagueForm', {read: ElementRef , static: true })
  leagueForm: ElementRef;

  constructor(
    private liveScoresService: LiveScoresService,
    private router: Router,
    private store: Store<any>,
    private formBuilder: FormBuilder,
    public homeService: HomeService
  ) {
    this.homeService.reset();
    this.competitionsForm = this.formBuilder.group({
      competition: ''
    });
  }

  route(data: IScoreItem) {
    this.router.navigate([`match/${data.teamOne.name}/${data.teamTwo.name}`], { queryParams: { status: data.status.statusInfo } });
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      this.sliceNumber =
        this.sliceNumber > this.length
          ? this.length
          : this.sliceNumber + 10;
    }
  }

  filters(filter) {
    filter.selected = !filter.selected;
    this.liveScores = this.liveScores.pipe(
      map(liveScores => this.homeService.filterStatus(liveScores))
    );
  }

  getLeagueName(leagueName: string) {
    const indexOf = leagueName.indexOf(":");
    if (indexOf > 0) {
      return leagueName.substring(indexOf + 1);
    }
  }

  ngOnInit() {
    this.liveScores = timer(0, 60000)
      .pipe(
        switchMap(() => this.liveScoresService.updateScores())
      )

    this.competitionList$ = this.store.select(getCompetitions)
      .pipe(
        map(competitions => this.setCompetition(competitions)),
        mergeMap(() => this.leagueInput.valueChanges),
        map((value) => this.findCompetition(value))
      );
  }

  competitionFiltersClicked(filter: IFilterItem) {
    filter.selected = true;
    this.leagueForm.nativeElement.value = '';
    this.homeService.competitionSelectedList.push(filter);
    this.liveScores = this.liveScores.pipe(
      map(liveScores => this.homeService.filterCompetitions(liveScores))
    );
  }

  removeFilter(filter, type: string) {
    this.homeService.removeFilter(filter.name, type);
    this.liveScores = this.liveScores.pipe(
      map(liveScores => type === 'status' ? this.homeService.filterStatus(liveScores)
        : this.homeService.filterCompetitions(liveScores))
    );
  }

  findCompetition(filterStr: string) {
    const val = filterStr ?
      this.competitionList.filter((filterItem) => filterItem.name.toLowerCase().includes(filterStr.toLowerCase()))
      : this.competitionList
    return val
  }

  setCompetition(competitions) {
    competitions = competitions ? competitions : {};
    this.competitionList = [];
    Object.keys(competitions).forEach((competition, index) => {
      this.competitionList.push({
        id: index + 1,
        attr: "league.id",
        value: Number(competition),
        name: competitions[competition].n,
        selected: false,
        removable: true
      });
    });
    return this.competitionList;
  }

  trackBy(index: number, name: IScoreItem): number {
    return name.matchId;
  }
}
