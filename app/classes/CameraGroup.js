import {Container} from 'pixi.js';
import { debug } from '../helpers';

export default class CameraGroup extends Container {
    eventMode = 'static';
    moving = false;


    /**
     * A camera group that extends PIXI Containers. Add Sprites/Objects to the container to have them be moveable together
     * @param {Boolean} moveable : Whether the camera group can be manipulated by user inputs
     * @param {Number} moveScale : A multiplier to add to movement of the camera group
     * @param {Number} zoomScale : A multiplier to add to the scaling on the camera group
     */
    constructor(moveable=false, moveScale=1, zoomScale=1) {
        super();
        this.moveable   = moveable;
        this.moveScale  = moveScale;
        this.zoomScale  = zoomScale;

        if (this.moveable) {
            this._mousePositionReset();
            this._setEventListeners();
        }
    }


    /**
     * Adds the event listeners to handle camera movement based on mouse inputs
     */
    _setEventListeners() {
        // Bind event listeners to allow middle mouse to drag the screen around
        document.addEventListener("mousedown", (event) => {
            if (event.button === 1) {
                event.preventDefault();
                this.moving = true;
                this.mousePos = {x:event.clientX, y:event.clientY};
            }
        });
        document.addEventListener("mouseup", (event) => {
            if (event.button === 1) {
                event.preventDefault();
                this.moving = false;
                this.mousePos = {x:0, y:0};
            }
        });

        // Moves the camera group based on the mouse movement
        document.addEventListener("mousemove", (event) => {
            if (this.moving) {
                const newPos = {x:event.clientX, y:event.clientY};
                const delta = {
                    x: (this.mousePos.x - newPos.x) * this.moveScale,
                    y: (this.mousePos.y - newPos.y) * this.moveScale
                };
                
                this.position.x -= delta.x;
                this.position.y -= delta.y;

                this.mousePos = newPos;
            }
        });

        // Scale the camera group based on scroll wheels
        document.addEventListener("wheel", (event) => {
            event.preventDefault();
            const scrollAmount = (event.deltaY / 114) * this.zoomScale;
            
            this.scale.x -= scrollAmount;
            this.scale.y -= scrollAmount;

        }, { passive: false });
    }

    
    /**
     * Helper function to reset the stored mouse position. Used to calculate mouse delta.
     */
    _mousePositionReset() {
        this._mousePositionSet(0, 0);
    }


    /**
     * Sets the mouse position 
     * @param {Number} x 
     * @param {Number} y 
     */
    _mousePositionSet(x, y) {
        this.mousePos = {
            x: x,
            y: y
        };
    }


    /**
     * Main update method to be called as a part of the main event loop.
     */
    update() {
        // Placeholder code to verify being called
        if (this.moving) {
            debug("CameraPosition", "Moving");
        } else {
            debug("CameraPosition", "Not Moving");
        }
    }
}
