import { Component, OnInit, HostListener } from '@angular/core';

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
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 71) {
       let element = document.getElementById('mode-shifter');
       element.classList.add('sticky');
     } else {
      let element = document.getElementById('mode-shifter');
        element.classList.remove('sticky'); 
     }
  }

}
