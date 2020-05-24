import { createSelector } from '@ngrx/store';

export const selectApp = (state: any) => state;

export const getGamesState = createSelector(
  selectApp,
  (state: any) => state.score ? state.score.games : []
);

export const getCompetitions = createSelector(
  selectApp,
  (state: any) => state.score ? state.score.competitions : {}
);

export const getMatch = (matchId: number) => createSelector(
  selectApp,
  (state: any) => state.score ? state.score.games.filter(scoreItem => scoreItem.matchId === matchId)[0] : null
);
