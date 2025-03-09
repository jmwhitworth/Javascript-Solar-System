import { StellarObject } from './StellarObject';

export class SolarSystem {
    name: string;
    objects: StellarObject[];

    constructor(name: string) {
        this.name = name;
        this.objects = [];
    }

    generate_objects() {
        const sun = new StellarObject('sun', 'star', 200, 0, 0, '#fce570');
        this.objects.push(sun);

        const earth = new StellarObject('earth', 'planet', 50, 1000, 0.001, '#1e90ff', sun);
        this.objects.push(earth);

        const moon = new StellarObject('moon', 'moon', 10, 100, 0.02, '#d3d3d3', earth);
        this.objects.push(moon);
    }

    tick() {
        this.objects.forEach((object) => {
            object.tick();
        });
    }
}
