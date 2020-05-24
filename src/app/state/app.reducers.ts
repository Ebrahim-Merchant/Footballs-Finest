import { AppActionTypes, AppAction } from './app.actions';
import { Action } from '@ngrx/store';

const initialState = {
  games: [],
  competitions: {}
};

export function scoresReducers(state = initialState, action: AppAction) {
  switch (action.type) {
    case AppActionTypes.GET_SCORES_FULFILLED:
      return {
        ...state,
        ...action
      };
    case AppActionTypes.UPDATE_SCORES_FULFILLED:
          return {
            ...state,
            ...action
          };
  }
}
