import { MouseMoveHandler } from "./mouseMoveHandler";
import { submitMouseMove } from "../api/MouseApiService";

jest.mock("../api/MouseApiService");

const makeTouch = (x, y, identifier) => {
  return { clientX: x, clientY: y, identifier };
};

describe("MouseMoveHandler", () => {
  it("should return true when there is one touch", () => {
    const moveHandler = new MouseMoveHandler();

    const evt = new TouchEvent("touchstart", { touches: [{}] });

    expect(moveHandler.hasEnoughTouches(evt)).toBe(true);
  });

  it("should return false if there is more than one touch", () => {
    const moveHandler = new MouseMoveHandler();

    const evt = new TouchEvent("touchstart", { touches: [{}] });
    expect(moveHandler.hasEnoughTouches(evt)).toBe(true);
  });

  it("should save the current touch", () => {
    const moveHandler = new MouseMoveHandler();

    const t = makeTouch(300, 400, 1);
    const event = new TouchEvent("touchstart", { touches: [t] });

    moveHandler.startGesture(event);

    expect(moveHandler.startPoint).toBe(t);
  });

  it("should send mouse move to backend when touch is removed", async () => {
    const moveHandler = new MouseMoveHandler();

    const p1 = new TouchEvent("touchstart", {
      touches: [makeTouch(300, 400, 1)],
    });
    const p2 = new TouchEvent("touchend", {
      changedTouches: [makeTouch(400, 700, 1)],
    });

    moveHandler.startGesture(p1);
    await moveHandler.endGesture(p2);

    expect(submitMouseMove).toHaveBeenCalledWith(100, 300);
  });
});
