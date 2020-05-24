import { getCompetitions } from 'src/app/state/app.selectors';
import { HomeService, IFilterItem } from './home.service';
import {
  Component,
  OnInit,
  HostListener,
  OnDestroy
} from "@angular/core";
import { LiveScoresService } from "src/shared/services/live-scores/live-scores.service";
import { take, switchMap, map, tap, startWith } from "rxjs/operators";
import { interval, of, Subscription, Observable, throwError, timer } from "rxjs";
import { IScoreItem } from "src/shared/model/score-feed";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { getGamesState } from '../state/app.selectors';
import { FormBuilder, FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';



@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  liveScores: Observable<IScoreItem[]>;
  lenght: number;
  competitionList: Observable<Array<IFilterItem>>;
  competitionListSelected: Observable<Array<IFilterItem>>;
  updateScoresSubscription$: Subscription;
  sliceNumber = 28;
  live = false;
  competitions = ['One', 'Two', 'Three'];
  competitionsForm;
  separatorKeysCodes: number[] = [COMMA];
  leagueInput = new FormControl();

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
  ngOnDestroy(): void {
    if (!this.updateScoresSubscription$.closed) {
      this.updateScoresSubscription$.unsubscribe();
    }
  }

  route(data: IScoreItem) {
    this.router.navigate([`match/${data.teamOne.name}/${data.teamTwo.name}`], {queryParams: { status: data.status.statusInfo}});
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      this.sliceNumber =
        this.sliceNumber > this.lenght
          ? this.lenght
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
   console.log('on init');
   this.liveScoresService.competitions.subscribe(competition => this.competitions = competition);
   this.liveScores = this.store.select(getGamesState)
    .pipe(tap(resp => resp ? this.lenght = resp.length : null));

   this.competitionList = this.store.select(getCompetitions)
      .pipe(
      map(competitions => {
        competitions = competitions ? competitions : {};
        const competitionList: Array<IFilterItem> = [];
        Object.keys(competitions).forEach((competition, index) => {
          competitionList.push({
            id: index + 1,
            attr: "league.id",
            value: Number(competition),
            name: competitions[competition].n,
            selected: false,
            removable: true
          });
        });
        return competitionList;
    }));

   this.leagueInput.valueChanges.pipe(
      startWith(''))
      .subscribe(value => {
        console.log(value);
        this.competitionList.pipe(
          tap(resp => console.log(resp)),
          map(array => array.filter(resp => resp.name.includes(value))),
        );
      });


   this.updateScoresSubscription$ = timer(0, 60000)
      .pipe(
        switchMap(() => this.liveScoresService.updateScores())
      ).subscribe();
  }

  competitionFiltersClicked(filter: IFilterItem) {
    filter.selected = true;
    this.homeService.competitionSelectedList.push(filter);
    this.liveScores = this.liveScores.pipe(
      map(liveScores => this.homeService.filterCompetitions(liveScores))
    );
  }

  removeFilter(filter, type: string) {
    this.homeService.removeFilter(filter.name, type);
    this.liveScores = this.liveScores.pipe(
      map(liveScores => this.homeService.filterStatus(liveScores))
    );
  }
}
