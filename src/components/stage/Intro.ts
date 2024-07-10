import { Container, Sprite, Texture } from 'pixi.js';
import { Config } from '../../config';

export default class Intro extends Container {
    layerSprites: Sprite[] = [];

    constructor() {
        super();

        for (let i = 0; i < Config.backgrounds.buildings.bg.length; i++) {
            const texture = Texture.from(`background-buildings/${Config.backgrounds.buildings.bg[i]}`);
            console.log("= texture", texture);
            const scaleFactor = Config.height / texture.height;
            console.log("= scaleFactor", scaleFactor);
            // console.log("= x y ", aPosition[i], aPosition[i + 1]);
            const sprite = Sprite.from(texture);
            sprite.scale.set(scaleFactor);

            sprite.x = (i * (texture.width - 1)) * scaleFactor;

            this.addChild(sprite);

        }

       /* for (const layer of Config.backgrounds.buildings.layers) {
            console.log("= layer", layer);
            const texture = Texture.from(`background-buildings/${layer}`);

            const sprite = Sprite.from(texture);

            // sprite.scale.set(0.5);
            // sprite.anchor.set(0.5);
            this.layerSprites.push(sprite);

            this.addChild(sprite);
        }*/

    }

}