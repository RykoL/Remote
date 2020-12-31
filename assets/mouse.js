import { SingleTouchBehaviour, ScrollBehaviour } from './behaviour.js';

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
    constructor(remoteService) {
        this.pos = {x: 0, y: 0};
        this.registerEventHandlers();
        this.remoteService = remoteService;
        this.moveBehaviour = new SingleTouchBehaviour(remoteService)
        this.scrollBehaviour = new ScrollBehaviour(remoteService);
        this.activeBehaviour = null;
    }

    registerEventHandlers() {
        document.addEventListener("touchstart", this.handleTouchStart.bind(this));
        document.addEventListener("touchmove", this.handleTouchMove.bind(this));
        document.addEventListener("touchend", this.handleTouchEnd.bind(this));
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

const r = new RemoteService();
const touchController = new TouchEventController(r);