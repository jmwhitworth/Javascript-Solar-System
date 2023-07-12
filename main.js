import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: window,
});

document.body.appendChild(app.view);

// create a new Sprite from an image path
const bunny = PIXI.Sprite.from('/bunny.png');

// Set's the anchor of the sprite to be its center, so it rotates around the middle
bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.position.set(app.screen.width / 2, app.screen.height / 2)

// Allows the Sprite to interact with events: https://pixijs.download/release/docs/PIXI.Sprite.html#eventMode
bunny.eventMode = 'static';

// Adds the Sprite to the page
app.stage.addChild(bunny);

// Handling dragging and dropping
bunny.on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('globalpointermove', onDragMove);

function onDragStart(event) {
    // Store the initial position of the bunny and set dragging flag
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    // Reset the bunny's properties after dragging ends
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.position.set(newPosition.x, newPosition.y);
    }
}

// Listen for animate update
app.ticker.add((delta) =>
{
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    bunny.rotation += 0.05 * delta;
});
