import {Injectable} from '@angular/core';

@Injectable()
export class Circles {
canvasWidth=900
canvasHeight=500
circles: any[]=[]
sourceCircles: any[]=[]
pairs: any[]=[]
timeStep=0
circleMap=new Map<[any, any], any>()

   constructor() {
    for (let i=0 ; i<100 ; i++) {
      this.sourceCircles.push({
        x: this.randInt(900), // 0..900
        y: this.randInt(500), // 0..500
        radius: this.randInt(100) + 10, // 10..110
        xMove: this.randInt(5) - 2, // -2..2
        yMove: this.randInt(5) - 2,  // -2..2
        color: "rgba(100,100,0,0.5)"
      });
    }

    for (let i=0; i < this.sourceCircles.length - 1 ; i++) {
      for (let j=i; j < this.sourceCircles.length - 1 ; j++) {
        this.pairs.push([this.sourceCircles[i], this.sourceCircles[j + 1]]);
      }
    }
  }

  distance(circle1:any, circle2:any) {
    //(circle2.x - circle1.x) ** 2 + (circle2.y - circle1.y) ** 2
     return Math.sqrt(Math.pow((circle2.x - circle1.x),2) + Math.pow ((circle2.y - circle1.y),2))
  }


  update() {
    this.timeStep++;
    for (let sourceCircle of this.sourceCircles) {
      this.moveCircle(sourceCircle);
    }
    for (let pair of this.pairs) {
      let [left, right] = pair;
      let dist = this.distance(left, right);
      let overlap = dist - left.radius - right.radius;
      if (overlap < 0) {
        let midX = (left.x + right.x) / 2;
        let midY = (left.y + right.y) / 2;
        let radius = -overlap / 2;
        let collisionCircle = this.circleMap.get(pair);
        if (collisionCircle) {
          collisionCircle.x = midX;
          collisionCircle.y = midY;
          collisionCircle.radius = radius;
        } else {
          collisionCircle = {x: midX, y: midY, radius};
          this.circles.push(collisionCircle);
          this.circleMap.set(pair, collisionCircle);
        }
        if (!collisionCircle.visible) {
          collisionCircle.visible = true;
          let red = this.timeStep % 256;
          let green =(this.timeStep + 85) % 256;
          let blue = (this.timeStep +85 +85)% 256;
          collisionCircle.color = `rgba(${red}, ${green}, ${blue}, 0.5)`;
        }
      } else if (this.circleMap.has(pair)) {
        this.circleMap.get(pair).visible = false;
      }
    }
  }


  update0() {
        this.timeStep++;
    for (let sourceCircle of this.sourceCircles) {
      this.moveCircle(sourceCircle);
    }
        this.circles = [];
    for (let [left, right] of this.pairs) {
      let dist = this.distance(left, right);
      let overlap = dist - left.radius - right.radius;
      if (overlap < 0) {
        // midpoint = average of the two coordinates
        let midX = (left.x + right.x) / 2;
        let midY = (left.y + right.y) / 2;
        let collisionCircle = {x: midX, y: midY, radius: -overlap / 2};
        this.circles.push(collisionCircle);
      }
    }
  }
  

  moveCircle(circle: any) {
    circle.x += circle.xMove;
    circle.y += circle.yMove;
    if (circle.x > (this.canvasWidth + circle.radius)) {
      circle.x = 0 - circle.radius;
    }
    if (circle.x < (0 - circle.radius)) {
      circle.x = this.canvasWidth + circle.radius;
    }
    if (circle.y > (this.canvasHeight + circle.radius)) {
      circle.y = 0 - circle.radius;
    }
    if (circle.y < (0 - circle.radius)) {
      circle.y = this.canvasHeight + circle.radius;
    }
  } 

  randInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  }
