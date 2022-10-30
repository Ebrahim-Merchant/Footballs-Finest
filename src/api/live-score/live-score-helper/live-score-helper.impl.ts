import { APIResponse } from "src/core/model/score-feed";
import { IFeedList, ILiveScoreHelper } from "./live-score-helper.interface";

export class LiveScoreHelper implements ILiveScoreHelper {
    parseScoreFeed(response: APIResponse<any>): IFeedList {
        throw new Error("Method not implemented.");
    }
    parseUpdatedScores(response: APIResponse<any>, currentFeedList: IFeedList): IFeedList {
        throw new Error("Method not implemented.");
    }
    
}