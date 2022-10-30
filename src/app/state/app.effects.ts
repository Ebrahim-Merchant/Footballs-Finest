import { switchMap, switchMapTo } from 'rxjs/operators';
import { LiveScoresService } from '../../core/services/live-scores/live-scores.service';
import { AppActionTypes, AppActions } from './app.actions';
import { Actions, ofType, Effect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Store, Action } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AppEffects {

  @Effect() getScores$ = this.actions$.pipe(
    ofType(AppActionTypes.GET_SCORES),
    switchMap(() => this.getLiveScores())
  );


  constructor(
    private actions$: Actions,
    private liveScores: LiveScoresService,
    private appActions: AppActions) {}

    getLiveScores() {
      return this.liveScores.getLiveScores().pipe(
        map(({scores, competition}) => this.appActions.getScoresFulfilled(scores, competition))
      );
    }

}
