import {each, keys} from 'lodash';

function pos(x, y) {
  return '(' + x + ',' + y + ')';
}

function pair(src, dest) {
  return src + ',' + dest;
}

export default class Action {
  static configure(options) {
    this.karis = options.karis;

    let vertices = {};

    each(options.passability, (passable, index) => {
      let x = index % options.width;
      let y = ~~(index / options.width);

      if (passable) {
        vertices[pos(x, y)] = {x: x, y: y};
      }
    });

    let distances = {};
    let next = {};

    each(keys(vertices), (srcKey) => {
      each(keys(vertices), (destKey) => {
        distances[pair(srcKey, destKey)] = Infinity;
        next[pair(srcKey, destKey)] = null;
      });
    });

    each(vertices, (src, srcKey) => {
      let addIfExists = (adjX, adjY) => {
        let adjKey = pos(adjX, adjY);

        if (vertices[adjKey]) {
          distances[pair(srcKey, adjKey)] = 1;
          next[pair(srcKey, adjKey)] = adjKey;
        }
      };

      addIfExists(src.x + 1, src.y);
      addIfExists(src.x - 1, src.y);
      addIfExists(src.x, src.y + 1);
      addIfExists(src.x, src.y - 1);
    });

    each(keys(vertices), (midKey) => {
      each(keys(vertices), (srcKey) => {
        each(keys(vertices), (destKey) => {
          let oldDistance = distances[pair(srcKey, destKey)];
          let srcToMidDistance = distances[pair(srcKey, midKey)];
          let midToDestDistance = distances[pair(midKey, destKey)];

          if (oldDistance > srcToMidDistance + midToDestDistance) {
            distances[pair(srcKey, destKey)] =
              srcToMidDistance + midToDestDistance;
            next[pair(srcKey, destKey)] = next[pair(srcKey, midKey)];
          }
        });
      });
    });

    this.vertices = vertices;
    this.next = next;
  }

  static moveKarisAndDo(destX, destY, action) {
    let srcX = this.karis.x;
    let srcY = this.karis.y;

    let srcKey = pos(srcX, srcY);
    let destKey = pos(destX, destY);

    let currentKey = srcKey;

    let path = [];

    while (currentKey !== destKey) {
      let nextKey = this.next[pair(currentKey, destKey)];
      path.push(this.vertices[nextKey]);
      currentKey = nextKey;
    }

    if (this.karis.sitting) {
      this.karis.unsit();
    }

    this.karis.movementQueue = path;
    this.karis.whenDoneMoving = action;
  }

  static sitKaris(x, y, dx, dy) {
    this.karis.sit(x, y, dx, dy);
  }
}

