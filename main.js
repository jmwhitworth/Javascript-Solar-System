import { Application } from 'pixi.js';
import { Viewport } from 'pixi-viewport';

import axios from 'axios';

import { debug, loadJSONData } from './app/helpers.js';
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

const allStellarBodies = [];


let systemData = [];
const testData = axios.get('/milkyway.json')
    .then(function(response) {
        systemData = response.data;
    })
    .catch(function(error) {
        console.log(error);
    })
    .finally(function() {
        buildSystem(systemData);
    })


function buildSystem(data) {
    console.log(data);
    const stars = data['Stars'];
    for (let i = 0; i < stars.length; i++) {
        
        let star = stars[i];
        let newStar = new Star(star['Name'], star['Colour'], star['Radius'], star['Position']['x'], star['Position']['y']);
        viewport.addChild(newStar);
        allStellarBodies.push(newStar);

        let planets = star['Children'];

        for (let n = 0; n < planets.length; n++) {
            let planet = planets[n];
            let moons = planet['Children'];

            for (let x = 0; x < moons.length; x++) {
                let moon = moons[x];
            }
        }
    }


}

// Main rendering loop
let elapsed = 0;
app.ticker.add((delta) =>
{
    elapsed++;
    debug("Frame", String(elapsed));

    allStellarBodies.forEach((body) => {
        body.moveIt()
    })
});
