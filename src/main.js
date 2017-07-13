import Ramen from './ramen.js';
import PIXI from './pixi.js';

var renderer = PIXI.autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
renderer.render(stage);

