import { Application } from 'pixi.js';
import { Viewport } from 'pixi-viewport';

import { debug } from './app/helpers.js';
import Star from './app/classes/Star.js';


// Create main PIXI.js app
const app = new Application({
    background: '#111',
    resizeTo: window,
    antialias: true,
});
document.body.appendChild(app.view);


// Setup viewport / camera
const viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: 1000,
    worldHeight: 1000,

    events: app.renderer.events // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
})
app.stage.addChild(viewport)
viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate()


// Instantiate stars
const sun = new Star("#e99000", 0, 0, 40);
viewport.addChild(sun);

const notTheSun = new Star("#e6e6e6", 60, 200, 20);
viewport.addChild(notTheSun);


// Main rendering loop
let elapsed = 0;
app.ticker.add((delta) =>
{
    elapsed++;
    debug("Frame", String(elapsed));
});
