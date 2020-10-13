import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreTeamItemComponent } from './score-team-item.component';

describe('ScoreTeamItemComponent', () => {
  let component: ScoreTeamItemComponent;
  let fixture: ComponentFixture<ScoreTeamItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreTeamItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreTeamItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
