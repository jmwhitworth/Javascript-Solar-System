import {Graphics} from 'pixi.js';

export default class Star extends Graphics {
    constructor(colour, x, y, radius) {
        super();
        this.beginFill(colour);
        this.drawCircle(x, y, radius);
        this.endFill();
    }
}
