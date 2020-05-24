/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LineUpListComponent } from './line-up-list.component';

describe('LineUpListComponent', () => {
  let component: LineUpListComponent;
  let fixture: ComponentFixture<LineUpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineUpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineUpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
