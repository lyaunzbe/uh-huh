const p5 = require('p5');

import Element from './wanderer';
import music from './music';
import events from './events';

export default class {

  constructor () {
    this.p5instance = null;
    this.canvas = null;
  }
  init () {
    this.p5instance = new p5(this.sketch.bind(this));
  }
  sketch(p) {
    let cursor;
  	let elements;
  	let emotes, shapes;
  	let despair, dissapointment, heh, okay, sad, cool, ok, sos, brush;
  	let index;
  	let bg;
    let hue;
    let hueIncrement;
    let _this = this;
    let mouseMovedLast = Date.now();
    p.preload = function () {
      okay = p.loadImage('src/emoji/okay.png');
    }

    p.setup = function() {
      music.init();
      hue =  p.random(0,255);
      hueIncrement = 0.25;

      p.createCanvas(p.windowWidth, p.windowHeight);
  		p.noStroke();
  		p.smooth();
  		// let rad = Math.round(p.random(10,20));
  		//
  		elements = [];
  		// let total = Math.round(p.random(10, 100));
  		let total = 500;
  		for (var i = 0; i < total; i++) {
  			//emotes[p.round(p.random(0,4))]
  			let element = new Element(p.random(0, p.windowWidth), p.random(0, p.windowHeight),600,okay,p , i);
  			elements.push(element);
  		}
  		// p.noLoop();
      _this.canvas = p.canvas;

    }
    p.mouseMoved = function () {
      mouseMovedLast = Date.now();
    }

    p.draw = function() {
      music.update();
      // console.log(music.level());
      p.colorMode('HSB', 255);
      if (hue > 255.0) {
        hueIncrement = -hueIncrement;
      } else if (hue < 0.0) {
        hueIncrement = Math.abs(hueIncrement);
      }
      hue +=hueIncrement;
      // console.log(hue);

      bg = p.color(hue,200,255, 5 *(p.map(music.level(), 0,0.5, 0, 2.0)));

      p.background(bg);
      p.colorMode('RGB', 255);
      let mouseIsMoving = !((Date.now()-mouseMovedLast) > 2000);
      console.log(mouseIsMoving);
  		for (var i = 0; i < elements.length; i++) {
        // console.log(mouseMoved);
  			elements[i].wander(music,mouseIsMoving);
  			elements[i].run(music);
  			// elements[i].mousesMoved(elements[10].location.x,elements[10].location.y);
  		}
  		// element.wander();
  		// element.run();
  	}
  }

}
