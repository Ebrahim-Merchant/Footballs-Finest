/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LineUpsComponent } from './line-ups.component';

describe('LineUpsComponent', () => {
  let component: LineUpsComponent;
  let fixture: ComponentFixture<LineUpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineUpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
