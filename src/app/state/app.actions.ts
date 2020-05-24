import { Action } from '@ngrx/store';
import { IScoreItem } from 'src/shared/model/score-feed';

export interface AppAction extends Action {
  games: Array<IScoreItem>;
  competitions?: {};
}

const APP_NAMESPACE = 'APP';
export const AppActionTypes = {
  GET_SCORES: `${APP_NAMESPACE}_GET_SCORES`,
  GET_SCORES_FULFILLED: `${APP_NAMESPACE}_GET_SCORES_FULFILLED`,
  GET_SCORES_ERROR: `${APP_NAMESPACE}_GET_SCORES_ERROR`,
  UPDATE_SCORES: `${APP_NAMESPACE}_UPDATE_SCORES`,
  UPDATE_SCORES_FULFILLED: `${APP_NAMESPACE}_UPDATE_SCORES_FULFILLED`,
  UPDATE_SCORES_ERROR: `${APP_NAMESPACE}_UPDATE_SCORES_ERROR`,
};

export class AppActions {

  getScores() {
    console.log(AppActionTypes.GET_SCORES);
    return {
      type: AppActionTypes.GET_SCORES
    };
  }

  getScoresError() {
    return {
      type: AppActionTypes.GET_SCORES
    };
  }

  getScoresFulfilled(games: IScoreItem[], competitions = {}): AppAction {
    return {
      type: AppActionTypes.GET_SCORES_FULFILLED,
      games,
      competitions
    };
  }

  updateScores() {
    return {
      type: AppActionTypes.UPDATE_SCORES
    };
  }

  updateScoresError() {
    return {
      type: AppActionTypes.UPDATE_SCORES_ERROR
    };
  }

  updateScoresFulfilled(games) {
    return {
      type: AppActionTypes.UPDATE_SCORES_FULFILLED,
      games
    };
  }
}
