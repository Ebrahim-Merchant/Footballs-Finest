import { NgModule, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreCardComponent } from './score-card.component';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [ScoreCardComponent],
  declarations: [ScoreCardComponent]
})
export class ScoreCardModule {}
