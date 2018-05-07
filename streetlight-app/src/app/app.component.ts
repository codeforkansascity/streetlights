import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  mode: 'spreadsheet' | 'map';

  ngOnInit() {
    this.mode = 'map';
  }

  onModeShiftClick(mode: 'spreadsheet' | 'map') {
    this.mode = mode;
  }
}