import { NgModule, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreCardComponent } from './score-card.component';
import { MatCardModule } from '@angular/material';
import { ScoreTeamItemComponent } from './score-team-item/score-team-item.component';
import { ScoreCardHeaderComponent } from './score-card-header/score-card-header.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [ScoreCardComponent],
  declarations: [ScoreCardComponent, ScoreTeamItemComponent, ScoreCardHeaderComponent]
})
export class ScoreCardModule {}
