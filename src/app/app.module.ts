import { AppActions } from './state/app.actions';
import { AppEffects } from './state/app.effects';
import { LineUpsComponent } from "./match/line-ups/line-ups.component";
import { ScoreCardModule } from "./../shared/components/score-card/score-card.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatChipsModule,
  MatTabsModule,
  MatListModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule
} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { MatchComponent } from "./match/match.component";
import { LineUpPlayerItemComponent } from "./match/line-ups/line-up-player-item/line-up-player-item.component";
import { LineUpListComponent } from "./match/line-ups/line-up-list/line-up-list.component";
import { StoreModule } from '@ngrx/store';
import { scoresReducers } from './state/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsComponent } from './match/events/events.component';

const reducers = {
  score: scoresReducers
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatchComponent,
    LineUpsComponent,
    LineUpListComponent,
    LineUpPlayerItemComponent,
    EventsComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    ScoreCardModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mode
      maxAge: 25 //  Retains last 25 states
    }),
  ],
  providers: [
    AppEffects,
    AppActions
  ],
  bootstrap: [AppComponent],
  entryComponents: [HomeComponent]
})
export class AppModule {
}
