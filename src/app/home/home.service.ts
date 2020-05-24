import { Injectable } from '@angular/core';
import { IScoreItem } from 'src/shared/model/score-feed';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface IFilterItem {
  id: number;
  attr: string;
  value: any;
  name: string;
  selected: boolean;
  removable?: boolean;
}
export const DEFAULT_FILTER_LIST = [
  {
    id: 1,
    attr: "status.statusInfo",
    value: "Live",
    name: "Live",
    selected: false
  },
  {
    id: 2,
    attr: "status.statusInfo",
    value: "Scheduled",
    name: "Upcoming",
    selected: false
  },
  {
    id: 3,
    attr: "status.statusInfo",
    value: "Ended",
    name: "Full Time",
    selected: false
  }
];

export const DEFAULT_COMPETTION_LIST = [];

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  competitionSelectedList: IFilterItem[] = [];
  selectedId: number;
  defaultValue = true;
  filterList: IFilterItem[] = [
    {
      id: 1,
      attr: "status.statusInfo",
      value: "Live",
      name: "Live",
      selected: false
    },
    {
      id: 2,
      attr: "status.statusInfo",
      value: "Scheduled",
      name: "Upcoming",
      selected: false
    },
    {
      id: 3,
      attr: "status.statusInfo",
      value: "Ended",
      name: "Full Time",
      selected: false
    }
  ];


  constructor() { }


  reset() {
    this.filterList = DEFAULT_FILTER_LIST;
    this.competitionSelectedList = DEFAULT_COMPETTION_LIST;
  }

  filterCompetitions(liveScores: IScoreItem[]) {
    return liveScores.filter(liveScoreItem =>
      this.competitionSelectedList.some(competition =>
        liveScoreItem.league.id === competition.value
      )
    );
  }

  filterStatus(liveScores) {
    const filter = this.filterList.filter(filterItem => filterItem.selected);
    if (!liveScores || !filter || !(filter.length > 0)) {
      return liveScores;
    }
    const filterList = liveScores.filter(liveScore => {
      return filter.some(item =>  this.resolve(item.attr, liveScore) === item.value);
    });
    return filterList;
  }

  resolve(path, obj) {
    return path
      .split(".")
      .reduce((prev, curr) => (prev ? prev[curr] : null), obj || self);
  }

  removeFilter(filterName: string, type: string) {
    if (type === 'status') {
      this.filterList = this.filterList.filter(filterItem => filterItem.name !== filterName);
    } else if (type === 'competition') {
      this.competitionSelectedList = this.competitionSelectedList.filter(filterItem => filterItem.name !== filterName);

    }
  }

}
