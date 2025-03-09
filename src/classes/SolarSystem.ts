import { StellarObject } from './StellarObject';


interface BodyJSON {
    name: string;
    type: string;
    size: number;
    distance: number;
    velocity: number;
    colour: string;
    satellites: BodyJSON[];
}

export class SolarSystem {
    name: string;
    objects: StellarObject[];

    constructor(bodies: BodyJSON[]) {
        this.name = "";
        this.objects = [];

        this.generate_objects(bodies);
    }

    generate_objects(bodies: BodyJSON[], primary?: StellarObject) {
        bodies.forEach((body) => {
            const object = new StellarObject(
                body.name,
                body.type,
                body.size * 0.0001,
                body.distance * 0.000001,
                body.velocity * 0.00000001,
                body.colour,
                primary
            );
            this.objects.push(object);
            if (body.satellites) {
                this.generate_objects(body.satellites, object);
            }
        });
    }

    tick() {
        this.objects.forEach((object) => {
            object.tick();
        });
    }
}
