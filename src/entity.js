export default class Entity {
  set x(x) {
    this._x = x;
    this.container.x = x * 32;
    if (this.foreground) {
      this.foreground.x = x * 32;
    }
  }

  set y(y) {
    this._y = y;
    this.container.y = y * 32;
    if (this.foreground) {
      this.foreground.y = y * 32;
    }
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  frame() {}
}

