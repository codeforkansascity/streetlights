import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MapViewComponent } from './map-view/map-view.component';
import { SpreadsheetViewComponent } from './spreadsheet-view/spreadsheet-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'map-view', component: MapViewComponent },
          { path: 'spreadsheet-view', component: SpreadsheetViewComponent },
          { path: '',
            redirectTo: 'map-view',
            pathMatch: 'full'
          },
          { path: '**', component: PageNotFoundComponent }
        ])
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Streetlight'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Streetlight');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Streetlight');
  }));
});
