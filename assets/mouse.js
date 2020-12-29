
class RemoteService {

    constructor() {

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
    }

    registerEventHandlers() {
        document.addEventListener("touchstart", this.handleTouchStart.bind(this));
        document.addEventListener('touchmove', function(e){ e.preventDefault(); });
        document.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    handleTouchStart(evt) {
        evt.preventDefault();
        
        // Only care about a single touch
        const touch = evt.touches[0];

        printToScreen(`Registered touches ${evt.targetTocuhes.length}`);
        
        console.log(`Starting at y: ${touch.clientY}`)

        this.pos = {x: touch.clientX, y: touch.clientY};
    }

    handleTouchEnd(evt) {
        evt.preventDefault();
        
        // Only care about a single touch
        const touch = evt.changedTouches[0];

        const dX = Math.round(calculateMovementDelta(this.pos.x, touch.clientX));
        const dY = Math.round(calculateMovementDelta(this.pos.y, touch.clientY));

        document.getElementsByTagName("p")[0].innerHTML = dX.toString() + " " + dY.toString();
    
        if (dX === 0 && dY === 0) {
            this.remoteService.submitMouseClick();
        } else {
            this.remoteService.submitMouseMove(dX, dY).then((val) => {
                console.log(val);
            })
        }

        this.pos = {x: 0, y: 0};
    }
}

class ScrollBehaviour {
    
    constructor() {

    }
}

const calculateMovementDelta = (c1, c2) => {
    if (c1 === c2) {
        return 0;
    }

    const sign = (c2 > c1) ? 1 : -1;

    return sign * (Math.max(c1, c2) - Math.min(c1, c2));
}

const printToScreen = (text) => {
    document.getElementsByTagName("p")[0].innerHTML = text;
}

const r = new RemoteService();
const touchController = new TouchEventController(r);