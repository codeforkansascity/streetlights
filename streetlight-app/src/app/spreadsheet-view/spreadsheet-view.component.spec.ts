import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsheetViewComponent } from './spreadsheet-view.component';

describe('SpreadsheetViewComponent', () => {
  let component: SpreadsheetViewComponent;
  let fixture: ComponentFixture<SpreadsheetViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadsheetViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadsheetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
