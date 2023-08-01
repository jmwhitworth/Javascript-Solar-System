import {Graphics} from 'pixi.js';

export default class Star extends Graphics {
    constructor(name, colour, radius, x, y) {
        super();
        
        this.name   = name;
        this.colour = colour;
        this.radius = radius;
        this.x      = x;
        this.y      = y;

        this.beginFill(this.colour);
        this.drawCircle(this.x, this.y, this.radius);
        this.endFill();
    }
}
