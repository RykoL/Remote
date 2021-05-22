import { submitScroll } from "../api/MouseApiService";
import { BaseHandler } from "./baseHandler";
import { calculateMovementDelta } from "../util";

const calculateMedianPoint = (points) => {
  return {
    x: (points[0].clientX + points[1].clientX) / 2,
    y: (points[0].clientY + points[1].clientY) / 2,
  };
};

const getTouchPointMap = (touchList) => {
  const map = {};
  for (const touch of touchList) {
    map[touch.identifier] = touch;
  }
  return map;
};

export class MouseScrollHandler extends BaseHandler {
  constructor() {
    super();
    this.operation = "Scrolling";
  }

  startGesture(evt) {
    if (this.hasEnoughTouches(evt.touches)) {
      this.startPoint = calculateMedianPoint(evt.touches);
      this.touchMap = getTouchPointMap(evt.touches);
    }
  }

  async moveGesture(evt) {
    if (this.hasEnoughTouches(evt.changedTouches)) {
      const medianPoint = calculateMedianPoint(evt.changedTouches);

      const y = calculateMovementDelta(this.startPoint.y, medianPoint.y);
      const direction = y > 0 ? "up" : "down";
      await submitScroll(1, direction);
    }
  }

  async endGesture(evt) {}

  hasEnoughTouches(touches) {
    return touches.length === 2;
  }
}
