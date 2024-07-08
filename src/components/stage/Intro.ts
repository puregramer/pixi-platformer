import { Container, Texture } from 'pixi.js';
import { CompositeTilemap } from '@pixi/tilemap';
import { Config } from '../../config';

export default class Intro extends Container {

    constructor() {
        super();

        const introBg = new CompositeTilemap();

        // const tile = Texture.from(`background-buildings/${Config.backgrounds.buildings.bg[0]}`);

        introBg.tile(`background-buildings/${Config.backgrounds.buildings.bg[0]}`, 0, 0,
            { rotate:2, tileWidth: 240, tileHeight: 120 , u: 120, v: 120});
        // introBg.tileRotate(0);
        // introBg.tile(tile, 0, 0)
        this.addChild(introBg);

    }



}