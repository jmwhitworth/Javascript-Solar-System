import {Graphics} from 'pixi.js';

export class StellarObject extends Graphics {
    name: string;
    type: string;
    size: number;
    distance: number;
    velocity: number;
    colour: string;

    orbitalAngle: number;

    primary: StellarObject | null = null;
    satellites: StellarObject[] = [];

    constructor(name: string, type: string, size: number, distance: number, velocity: number, colour: string, primary?: StellarObject) {
        super();
        
        this.name = name;
        this.type = type;
        this.size = size;
        this.distance = distance;
        this.velocity = velocity;
        this.colour = colour;

        this.x = 0;
        this.y = 0;
        this.orbitalAngle = Math.random() * Math.PI * 2;

        if (primary) {
            this.primary = primary;
        }
        this.satellites = [];

        this.circle(this.x, this.y, this.size);
        this.fill(this.colour);
    }

    /**
     * Updates the position of the object based on its orbital parameters.
     */
    tick() {
        if (!this.primary) {
            return;
        }

        this.x = this.primary.x + this.distance * Math.cos(this.orbitalAngle);
        this.y = this.primary.y - this.distance * Math.sin(this.orbitalAngle);
        this.orbitalAngle += this.velocity;
    }
}
