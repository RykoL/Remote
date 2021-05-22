export class BaseHandler {
  startGesture(evt) {
    throw Error("Not implemented");
  }

  async moveGesture(evt) {}

  async endGesture(evt) {
    throw Error("Not implemented");
  }

  hasEnoughTouches(evt) {
    throw Error("Not implemented");
  }
}
