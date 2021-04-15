import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})


export class CarouselComponent implements OnInit {

  public slides = [{src:"src\\assets\\images\\aaron-lee-hXcGZg3rAkU-unsplash.jpg"}
                    ,{src:`src\assets\images\brock-wegner-8tso_50wVik-unsplash.jpg`}
                    ,{src:`src\assets\images\namra-desai-qSxwhsqYRak-unsplash.jpg`}
                    ,{src:`src\assets\images\olaf-wisser-s1-dL4f_HEs-unsplash.jpg`}
                    ,{src:`src\assets\images\ricardo-ortega--G1_BDMADqU-unsplash.jpg`}]

  constructor() { }

  ngOnInit() {
  }

}
