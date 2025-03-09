import { Application } from "pixi.js";
import { StellarObject } from "./classes/StellarObject";
import { debug } from "./helpers";

(async () => {
  const app = new Application();
  await app.init({ background: "#111", resizeTo: window, antialias: true });
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  // Create Sun Graphic
  const sun = new StellarObject('#e99000', 200, 0, 0);
  app.stage.addChild(sun);

  let elapsed = 0;
  app.ticker.add((time) =>
  {
      elapsed++;

      //sun.tick();

      debug("Frame", String(elapsed));
      debug("Delta", String(time.deltaMS));
      debug("Sun", `x: ${sun.x}, y: ${sun.y}`);
  });

})();
