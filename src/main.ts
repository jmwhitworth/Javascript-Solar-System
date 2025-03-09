import { Application } from "pixi.js";
import { Viewport } from "pixi-viewport";
import { StellarObject } from "./classes/StellarObject";
import { debug } from "./helpers";

(async () => {
  const app = new Application();
  await app.init({ background: "#111", resizeTo: window, antialias: true });
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: 1000,
    worldHeight: 1000,
    events: app.renderer.events,
  });

  app.stage.addChild(viewport);
  viewport.drag().pinch().wheel().decelerate();

  // Create Sun Graphic
  let stellar_objects = [];
  stellar_objects.push(new StellarObject('#fce570', 200, 0, 0));
  stellar_objects.push(new StellarObject('#1e90ff', 50, 300, 0));
  stellar_objects.push(new StellarObject('#d3d3d3', 10, 350, 0));
  
  stellar_objects.forEach((object) => {
    viewport.addChild(object);
  });

  let elapsed = 0;
  app.ticker.add((time) =>
  {
      elapsed++;

      //sun.tick();

      debug("Frame", String(elapsed));
      debug("Delta", String(time.deltaMS));
      debug("ViewportPos", `x: ${viewport.x}, y: ${viewport.y}`);
      debug("ViewportScale", `scale: ${viewport.scale.x}, ${viewport.scale.y}`);
  });

})();
