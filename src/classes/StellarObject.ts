import {Graphics} from 'pixi.js';

export class StellarObject extends Graphics {
    colour: string;
    radius: number;

    constructor(colour: string, radius: number, x: number, y: number) {
        super();
        
        this.colour = colour;
        this.radius = radius;
        this.x      = x;
        this.y      = y;

        this.circle(this.x, this.y, this.radius);
        this.fill(this.colour);
    }

    /**
     * Updates the position of the object.
     */
    tick() {
        this.x ++;
    }
}
