import { Action } from '@ngrx/store';
import { IScoreItem } from 'src/shared/model/score-feed';

export interface MatchAction extends Action {
  games: Array<IScoreItem>;
  competitions?: Array<any>;
}

const APP_NAMESPACE = 'MATCH';
export const MatchActionTypes = {
  GET_MATCH_INFO: `${APP_NAMESPACE}_GET_MATCH_INFO`,
  GET_MATCH_INFO_FULFILLED: `${APP_NAMESPACE}_GET_MATCH_INFO_FULFILLED`,
  GET_MATCH_INFO_ERROR: `${APP_NAMESPACE}_GET_MATCH_INFO_ERROR`,
  UPDATE_MATCH_DATA: `${APP_NAMESPACE}_UPDATE_MATCH_DATA`,
  UPDATE_MATCH_DATA_FULFILLED: `${APP_NAMESPACE}_UPDATE_MATCH_DATA_FULFILLED`,
  UPDATE_MATCH_DATA_ERROR: `${APP_NAMESPACE}_UPDATE_MATCH_DATA_ERROR`
};

export class MatchActions {

  getMatchInfo() {
    return {
      type: MatchActionTypes.GET_MATCH_INFO
    };
  }

  getMatchError() {
    return {
      type: MatchActionTypes.GET_MATCH_INFO_ERROR
    };
  }

  getMatchInfoFulfilled(games: IScoreItem[]): MatchAction {
    return {
      type: MatchActionTypes.GET_MATCH_INFO_FULFILLED,
      games
    };
  }

  updateMatchData() {
    return {
      type: MatchActionTypes.UPDATE_MATCH_DATA
    };
  }

  updateMatchDataError() {
    return {
      type: MatchActionTypes.UPDATE_MATCH_DATA_ERROR
    };
  }

  updateMatchDataFulfilled(games) {
    return {
      type: MatchActionTypes.UPDATE_MATCH_DATA_FULFILLED,
      games
    };
  }
}
