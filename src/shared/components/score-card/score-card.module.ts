import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreCardComponent } from './score-card.component';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  declarations: [ScoreCardComponent]
})
export class ScoreCardModule { }
