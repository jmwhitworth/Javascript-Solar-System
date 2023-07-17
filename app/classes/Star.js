import {Graphics} from 'pixi.js';

export default class Star extends Graphics {
    constructor(colour, x, y, radius) {
        super();
        this.colour = colour;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.beginFill(this.colour);
        this.drawCircle(this.x, this.y, this.radius);
        this.endFill();
    }
}
