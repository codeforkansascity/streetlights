import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  mode: 'spreadsheet' | 'map' | 'landing';

  ngOnInit() {
    this.mode = 'landing';
  }

  onModeShiftClick(mode: 'spreadsheet' | 'map' | 'landing') {
    this.mode = mode;
  }

}
