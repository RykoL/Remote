import { submitMouseMove } from "../api/MouseApiService";
import { calculateMovementDelta } from "../util";
import { BaseHandler } from "./baseHandler";

export class MouseMoveHandler extends BaseHandler {

    constructor() {
        super();
        this.startPoint = null;
        this.isActive = false;
        this.operation = "moving";
    }
    
    startGesture(evt) {
        if (this.hasEnoughTouches(evt)) {
            this.startPoint = evt.touches[0];
            this.isActive = true;
        }

    }

    async endGesture(evt) {
        if (!this.isActive) {
            throw new Error("No starting gesture was recognized");
        }
        const endPoint = evt.changedTouches[0];

        const x = calculateMovementDelta(this.startPoint.clientX, endPoint.clientX);
        const y = calculateMovementDelta(this.startPoint.clientY, endPoint.clientY);

        await submitMouseMove(x, y);
    }

    hasEnoughTouches(evt) {
        return evt.touches.length === 1;
    }
}