import {Application} from 'pixi.js';
import {debug} from './models/helpers.js';
import CameraGroup from './models/CameraGroup.js';
import Star from './models/Star.js';


// Create main PIXI.js app
const app = new Application({
    background: '#111',
    resizeTo: window,
    antialias: true,
});
document.body.appendChild(app.view);

// Create camera group to contain moveable sprites
const camera = new CameraGroup();
app.stage.addChild(camera);


// Testing mouse events on full window
app.renderer.view.addEventListener('mousedown', function(event) {
    debug("Start", elapsed);
    debug("Mousebutton", event.button);
});
app.renderer.view.addEventListener('mouseup', function(event) {
    debug("End", elapsed);
    debug("Mousebutton", event.button);
});
app.renderer.view.addEventListener('touchstart', function(event) {
    debug("Start", elapsed);
    debug("Mousebutton", event.button);
});
app.renderer.view.addEventListener('touchend', function(event) {
    debug("End", elapsed);
    debug("Mousebutton", event.button);
});


// Testing moving the new camera group
camera.onglobalpointermove = (event) => {
    debug("pointer", event);
    if (camera.moveit) {
        const x = event.data.getLocalPosition(app.stage).x;
        const y = event.data.getLocalPosition(app.stage).y;
        camera.position.set(x, y);
    }
}


// Instantiate stars
const sun = new Star("#e99000", app.screen.width/10, app.screen.height/2, 40);
camera.addChild(sun);

const notTheSun = new Star("#e6e6e6", 60, 200, 20);
camera.addChild(notTheSun);


// Main rendering loop
let elapsed = 0;
app.ticker.add((delta) =>
{
    elapsed++;
    sun.position.x += 0.1;
    debug("Frame", elapsed);
    debug("Camera Pos", camera.position.x +", "+ camera.position.y);
});
