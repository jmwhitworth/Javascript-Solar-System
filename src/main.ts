import { Application } from "pixi.js";
import { Viewport } from "pixi-viewport";

import { SolarSystem } from "./classes/SolarSystem";
import { debug, loadJSONData } from "./helpers";

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

  let bodies = await loadJSONData('/bodies.json');
  const milky_way = new SolarSystem(bodies['milkyway']);
  milky_way.objects.forEach((object) => {
    viewport.addChild(object);
  });

  let elapsed = 0;
  app.ticker.add((time) =>
  {
      elapsed++;

      milky_way.tick();

      debug("Frame", String(elapsed));
      debug("Delta", String(time.deltaMS));
      debug("ViewportPos", `x: ${viewport.x}, y: ${viewport.y}`);
      debug("ViewportScale", `scale: ${viewport.scale.x}, ${viewport.scale.y}`);
  });

})();
