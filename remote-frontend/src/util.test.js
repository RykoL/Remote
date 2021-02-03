import { calculateMovementDelta, touchListToArray } from "./util";

test("should calculate the positive delta", () => {
  expect(calculateMovementDelta(300, 100)).toBe(-200);
});

test("should calculate the negative delta", () => {
  expect(calculateMovementDelta(100, 300)).toBe(200);
});

test("should convert a TouchList to a regular array", () => {
  // You might wonder why a touch event is creaded instead of a TouchList
  // Simple because it isn't possible to do it otherwise.
  const t = new TouchEvent("touchstart", {
    touches: [{ clientX: 0, clientY: 0 }],
  });

  expect(touchListToArray(t.touches)).toBeInstanceOf(Array);
  expect(touchListToArray(t.touches).length).toBe(t.touches.length);
  expect(touchListToArray(t.touches)[0]).toBe(t.touches[0]);
});
