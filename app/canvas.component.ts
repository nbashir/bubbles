import {Component} from '@angular/core';
import {CircleComponent} from './circle.component';
import {Circles} from './circles.service'

@Component({
    selector: 'mb-canvas',
    template: `
    <svg viewBox='0 0 900 500' preserveAspectRatio="xMidYMid meet">
    <!-- 
    <svg:g mb-circle *ngFor="let circledata of circlesvc.sourceCircles" [circleprop]="circledata" />
    -->
    <svg:g mb-circle *ngFor="let circledata of circlesvc.circles" [circleprop]="circledata" />
    </svg>
    `,
    /* to give explicit width and height in svg box.
styles: [`
      svg {width:900px; height: 500px; position: fixed; top:0; left:0; bottom:0; right:0; border:1px solid grey;}
      `]
      */
directives: [CircleComponent],
styleUrls: ['app/canvas.component.css'],
 providers: [Circles]
})

export class CanvasComponent {

  running=true

  constructor(private circlesvc: Circles) {
  }

  ngOnInit() {
    this.animationFrame();
  }

  ngOnDestroy() {
    this.running = false;
  }

  animationFrame() {
    //this.animationFrame()
    this.circlesvc.update();
    if (this.running) {
      requestAnimationFrame(() => this.animationFrame());
    }
  }
}

