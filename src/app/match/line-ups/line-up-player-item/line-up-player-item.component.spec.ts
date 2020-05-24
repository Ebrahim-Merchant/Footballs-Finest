/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LineUpPlayerItemComponent } from './line-up-player-item.component';

describe('LineUpPlayerItemComponent', () => {
  let component: LineUpPlayerItemComponent;
  let fixture: ComponentFixture<LineUpPlayerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineUpPlayerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineUpPlayerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
