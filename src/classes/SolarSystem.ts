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

interface Scales {
    [key: string]: Scale;
}

interface Scale {
    size: number;
    distance: number;
    velocity: number;
}


export class SolarSystem {
    name: string;
    objects: StellarObject[];
    scales: Scales = {
        "star": {
            size: 0.0000003,
            distance: 0,
            velocity: 0,
        },
        "planet": {
            size: 0.000002,
            distance: 0.00000001,
            velocity: 0.00000001,
        },
        "moon": {
            size: 0.000001,
            distance: 0.0000001,
            velocity: 0.000001,
        }
    };

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
                body.size * this.scales[body.type].size,
                body.distance * this.scales[body.type].distance,
                body.velocity * this.scales[body.type].velocity,
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
