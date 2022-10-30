import { APIResponse, IScoreItem } from "src/core/model/score-feed";

export interface ILiveScoreHelper {
    parseScoreFeed(response: APIResponse<any>): IFeedList;
    parseUpdatedScores(response: APIResponse<any>, currentFeedList: IFeedList): IFeedList;
}

export interface IFeedList { 
    scores: IScoreItem[];
    competition: ICompetition;
}

interface ICompetition {
    n: string;
    bc: string;
    cId: string;
    s: number;
    fl: string;
  }


new Map<string, string>([
    ['g', 'games'],
    ['sc1', 'scoreOne'],
    ['sc2', 'scoreTwo'],
])
