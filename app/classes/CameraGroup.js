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
    _debug          = false;

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
                this._setMousePosition(event.clientX, event.clientY);
            }
        });
        eventHandler.addEventListener("mouseup", (event) => {
            if (event.button === 1) {
                event.preventDefault();
                this.moving = false;
                this._setMousePosition();
            }
        });

        // Moves the camera group based on the mouse movement
        eventHandler.addEventListener("mousemove", (event) => {
            if (this.moving) {
                const currentMousePosition = {x:event.clientX, y:event.clientY};
                const previousMousePosition = this._getMousePosition();
                const delta = {
                    x: (previousMousePosition.x - currentMousePosition.x) * this.scaleMovement,
                    y: (previousMousePosition.y - currentMousePosition.y) * this.scaleMovement
                };
                
                this.position.x -= delta.x;
                this.position.y -= delta.y;
                this._setMousePosition(currentMousePosition.x, currentMousePosition.y);
            }

            if (this._debug) {
                debug("Mouse position", String(event.clientX)+", "+String(event.clientY));
                debug("Mouse rel position", String(this.position.x - event.clientX)+", "+String(this.position.y - event.clientY));
            }
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
     * Sets the mouse position 
     * @param {Number} x 
     * @param {Number} y 
     */
    _setMousePosition(x=0, y=0) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw TypeError('X and Y must both be Numbers');
        }

        this._savedMousePosition = {
            x: x,
            y: y
        };
    }


    /**
     * Gets the previously saved mouse position.
     * @returns {Object} Containing x & y values
     */
    _getMousePosition() {
        return this._savedMousePosition;
    }


    /**
     * Enable/Disable debugging mode. Enables screen output of key variables
     * @param {Boolean} set Assigned to debug mode variable
     */
    debug(set=false) {
        this._debug = set;
    }


    /**
     * Call to enable the camera group to be moveable by mouse inputs
     * @param {Number} scaleMovement : A multiplier to add to movement
     * @param {Number} scaleZoom : A multiplier to add to scaling
     */
    enableMovement(eventHandler, scaleMovement=1, scaleZoom=1) {
        if (eventHandler === undefined) {
            throw TypeError(this._noEventHandler);
        }
        
        this.moveable = true;
        this.scaleMovement = scaleMovement;
        this.scaleZoom = scaleZoom;
        this._setMousePosition();
        this._setEventListeners(eventHandler);
    }


    /**
     * Main update method to be called as a part of the main event loop.
     */
    update() {
        if (this._debug) {
            if (this.moving) {
                debug("CameraPosition", "Moving");
            } else {
                debug("CameraPosition", "Not Moving");
            }
            debug("Camera pos", String(this.position.x)+", "+String(this.position.y));
        }
    }
}
