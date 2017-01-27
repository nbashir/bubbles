import {Component} from '@angular/core';

@Component({
  selector: '[mb-circle]',
  inputs: ['circleprop'],
  template: `
  <svg:circle [attr.cx]="circleprop.x" [attr.cy]="circleprop.y" [attr.r]="circleprop.radius" [attr.fill]="circleprop.color" />
  `,
//styleUrls: ['app/circle.component.css']
//styleUrls: [require('css!./circle.component.css').toString()]
})
export class CircleComponent {
 /*
    getStyle() {
    // if(this.circleprop.visible) { return ''} else {return 'display: none'}
    return this.circleprop.visible ?
      '' :
      'display: none';
  }
     */
}
