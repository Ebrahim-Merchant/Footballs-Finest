import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  static getScheduledTime(unixTime: number) {
    return moment.unix(unixTime).format('hh:mm');
  }

  static getLeagueName(leagueName: string) {
    const indexOf = leagueName.indexOf(':');
    if (indexOf > 0) {
      return leagueName.substring(indexOf + 1);
    }
  }

  static getLogoURL(teamId: string) {
    return `https://s3.amazonaws.com/bookmkrs/img/logos/mini/${teamId}.png`;
  }

  static parseStatus(statusStr) {
    switch (statusStr) {
      case "-":
      case "":
        return "Scheduled";
      case "NIY":
        return "niy";
      case "1T":
      case "2T":
      case "HT":
      case "ET":
      case "11M":
        return "Live";
      case "FT":
      case "AET":
      case "Pen":
      case "FT":
      case "Res":
      case "AW":
        return "Ended";
      case "Canc":
      case "Pst":
        return "Cancelled";
      case "Ssp":
      case "Susp":
        return "Suspended";
    }
    return "";
  }

  static getStatus(status: string, whistleTimeUnix: number) {
    const statusInfo = UtilsService.parseStatus(status);
    if (whistleTimeUnix && statusInfo === "Live") {
      const whistleTime = moment.unix(whistleTimeUnix);
      const diffMinutes = moment().diff(whistleTime, "minute");
      return { status, time: diffMinutes, statusInfo, whistleTime: whistleTimeUnix };
    }
    return {
      status,
      statusInfo,
      whistleTime: whistleTimeUnix
    };
  }

  constructor() { }

}
