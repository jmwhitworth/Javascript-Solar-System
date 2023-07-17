import {Container} from 'pixi.js';
import {debug} from '../helpers';


/**
 * A camera group that extends PIXI Containers. Add Sprites/Objects to the container to have them be moveable together
 */
export default class CameraGroup extends Container {
    eventMode       = 'static';
    moving          = false;
    moveable        = false;
    scaleMovement   = 1;
    scaleZoom       = 1;

    // Error messages
    _noEventHandler = "No event handler set for Camera Group";


    /**
     * Adds the event listeners to handle camera movement based on mouse inputs
     * @param {*} eventHandler : Element to set the event listeners on
     */
    _setEventListeners(eventHandler) {
        if (eventHandler === undefined) {
            throw TypeError(this._noEventHandler);
        }

        // Bind event listeners to allow middle mouse to drag the screen around
        eventHandler.addEventListener("mousedown", (event) => {
            if (event.button === 1) {
                event.preventDefault();
                this.moving = true;
                this.mousePos = {x:event.clientX, y:event.clientY};
            }
        });
        eventHandler.addEventListener("mouseup", (event) => {
            if (event.button === 1) {
                event.preventDefault();
                this.moving = false;
                this.mousePos = {x:0, y:0};
            }
        });

        // Moves the camera group based on the mouse movement
        eventHandler.addEventListener("mousemove", (event) => {
            if (this.moving) {
                const newPos = {x:event.clientX, y:event.clientY};
                const delta = {
                    x: (this.mousePos.x - newPos.x) * this.scaleMovement,
                    y: (this.mousePos.y - newPos.y) * this.scaleMovement
                };
                
                this.position.x -= delta.x;
                this.position.y -= delta.y;

                this.mousePos = newPos;
            }

            debug("Mouse position", String(event.clientX)+", "+String(event.clientY));
            debug("Mouse rel position", String(this.position.x - event.clientX)+", "+String(this.position.y - event.clientY));
        });

        // Scale the camera group based on scroll wheels
        eventHandler.addEventListener("wheel", (event) => {
            event.preventDefault();
            const scrollAmount = (event.deltaY / 114) * this.scaleZoom;
            
            if (this.scale.x-scrollAmount > 0 && this.scale.y-scrollAmount > 0) {
                this.scale.x -= scrollAmount;
                this.scale.y -= scrollAmount;
            }
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
     * Call to enable the camera group to be moveable by mouse inputs
     * @param {Number} scaleMovement : A multiplier to add to movement
     * @param {Number} scaleZoom : A multiplier to add to scaling
     */
    initialiseMovement(eventHandler, scaleMovement=1, scaleZoom=1) {
        if (eventHandler === undefined) {
            throw TypeError(this._noEventHandler);
        }
        
        this.moveable = true;
        this.scaleMovement = scaleMovement;
        this.scaleZoom = scaleZoom;
        this._setEventListeners(eventHandler);
    }
    initializeMovement = this.initialiseMovement;


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

        debug("Camera pos", String(this.position.x)+", "+String(this.position.y));
    }
}
