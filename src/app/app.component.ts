import { AppActions } from './state/app.actions';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'footballs-finest';
  constructor(private router: Router, private store: Store<any>, private appActions: AppActions) {
    this.store.dispatch(this.appActions.getScores());
  }

  navigate() {
    this.router.navigate(['']);
  }
}
