export default class Entity {
  set x(x) {
    this.container.x = x * 32;
  }

  set y(y) {
    this.container.y = y * 32;
  }
}

