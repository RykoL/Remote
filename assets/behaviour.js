
export class ScrollBehaviour {
    
    constructor(remoteService) {
        this.remoteService = remoteService;
        this.touchPoints = [];
        this.finishedTouches
    }

    beginGesture(evt) {
        const touches = [];
        for (let i = 0; i < evt.targetTouches.length; i++) {
            touches.push(evt.targetTouches[i]);
        }

        this.touchPoints = touches;
    }

    moveGesture(evt) {
    }

    endGesture(evt) {
        const endTouch = evt.changedTouches[0];
        const touch = this.touchPoints.filter((t) => {return t.identifier === endTouch.identifier})[0];
        this.touchPoints = this.touchPoints.filter((t) => {return t.identifier !== endTouch.identifier});

        if (this.touchPoints.length == 0) {
            const dY = Math.round(Math.abs(calculateMovementDelta(endTouch.clientY, touch.clientY)) / 10);
            const direction = (endTouch.clientY > touch.clientY) ? "up" : "down";
            this.remoteService.submitScroll(dY, direction);
        }

    }
}

export class SingleTouchBehaviour {
    
    constructor(remoteService) {
        this.remoteService = remoteService;
    }

    beginGesture(evt) {
        const touch = evt.touches[0];

        this.pos = {x: touch.clientX, y: touch.clientY};
    }

    moveGesture(evt) {
    }

    endGesture(evt) {
        const touch = evt.changedTouches[0];

        const dX = Math.round(calculateMovementDelta(this.pos.x, touch.clientX));
        const dY = Math.round(calculateMovementDelta(this.pos.y, touch.clientY));
        if (dX === 0 && dY === 0) {
            this.remoteService.submitMouseClick();
        } else {
            this.remoteService.submitMouseMove(dX, dY).then((val) => {
                console.log(val);
            })
        }
    }
}

const calculateMovementDelta = (c1, c2) => {
    if (c1 === c2) {
        return 0;
    }

    const sign = (c2 > c1) ? 1 : -1;

    return sign * (Math.max(c1, c2) - Math.min(c1, c2));
}