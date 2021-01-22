import { SingleTouchBehaviour, ScrollBehaviour } from './behaviour.js';
import { SettingsDialogController, Settings } from './settings.js';

class RemoteService {

    constructor() {

    }

    async log(text) {
        const body = text;
        const response = await fetch("/api/log", {
            method: 'POST',
            body
        });
    }

    async submitMouseMove(dx, dy) {
        const body = JSON.stringify({dx, dy});
        const response = await fetch("/api/mouse/move", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
    
        response.status !== 200 && console.error("Didn't succeed with mouse move");
    }

    async submitScroll(dy, direction) {
        const body = JSON.stringify({dy, direction});
        const response = await fetch("/api/mouse/scroll", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
    
        response.status !== 200 && console.error("Didn't succeed with mouse scroll");
    }

    async submitMouseClick() {
        const response = await fetch("/api/mouse/click", {
            method: 'POST',
        });
    }

    async fetchDeviceScreenSize() {
        const response = await fetch("/api/screen/size");
        return await response.json();
    }

}

class TouchEventController {
    constructor(targetElement, remoteService) {
        this.targetElement = targetElement;
        this.registerEventHandlers();
        this.moveBehaviour = new SingleTouchBehaviour(remoteService)
        this.scrollBehaviour = new ScrollBehaviour(remoteService);
        this.activeBehaviour = null;
    }

    registerEventHandlers() {
        this.targetElement.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.targetElement.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.targetElement.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    unregisterEventHandlers() {
        this.targetElement.removeEventListener("touchstart", this.handleTouchStart);
        this.targetElement.removeEventListener("touchmove", this.handleTouchMove);
        this.targetElement.removeEventListener("touchend", this.handleTouchEnd);
    }

    handleTouchStart(evt) {
        evt.preventDefault();
        
        if (evt.targetTouches.length > 1) {
            // Multi touch gesture
            this.activeBehaviour = this.scrollBehaviour;
        } else {
            // Only care about a single touch
            this.activeBehaviour = this.moveBehaviour;
        }

        this.activeBehaviour.beginGesture(evt);
    }

    handleTouchMove(evt) {
        evt.preventDefault();
        this.activeBehaviour.moveGesture(evt);
    }

    handleTouchEnd(evt) {
        evt.preventDefault();
        
        this.activeBehaviour.endGesture(evt);
    }
}

const targetElement = document.getElementById("touch-interface");
const dialogElement = document.getElementById("settings");
const r = new RemoteService();
const settingsDialogController = new SettingsDialogController(dialogElement);
const touchController = new TouchEventController(targetElement, r);