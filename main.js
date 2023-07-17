import {Application} from 'pixi.js';
import {debug} from './app/helpers.js';
import CameraGroup from './app/classes/CameraGroup.js';
import Star from './app/classes/Star.js';


// Create main PIXI.js app
const app = new Application({
    background: '#111',
    resizeTo: window,
    antialias: true,
});
document.body.appendChild(app.view);


// Create camera group to contain moveable sprites
const camera = new CameraGroup(true, 1, 0.1);
app.stage.addChild(camera);
camera.initialiseMovement(app.renderer.view, 1, 0.5);


// Instantiate stars
const sun = new Star("#e99000", 0, 0, 40);
camera.addChild(sun);

const notTheSun = new Star("#e6e6e6", 60, 200, 20);
camera.addChild(notTheSun);


// Main rendering loop
let elapsed = 0;
app.ticker.add((delta) =>
{
    elapsed++;
    debug("Frame", String(elapsed));

    camera.update();
});
