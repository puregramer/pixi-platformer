import { Container, Sprite, Texture, TilingSprite } from 'pixi.js';
import { Config } from '../../config';

export default class Intro extends Container {
    layerSprites: Sprite[] = [];

    constructor() {
        super();

        for (let i = 0; i < Config.backgrounds.buildings.bg.length; i++) {
            const texture = Texture.from(`${Config.backgrounds.buildings.bg[i]}`);
            console.log("= texture", texture);
            const scaleFactor = Config.height / texture.height;
            console.log("= scaleFactor", scaleFactor);
            // console.log("= x y ", aPosition[i], aPosition[i + 1]);
            const sprite = Sprite.from(texture);
            sprite.scale.set(scaleFactor);

            sprite.x = (i * (texture.width - 1)) * scaleFactor;

            this.addChild(sprite);
        }

        const tileLayer = new TilingSprite({
            texture: Texture.from(`${Config.backgrounds.buildings.layers[0].name}`),
            width: Config.width,
            height: 124,
        });
        tileLayer.y = Config.height - 124;
        this.addChild(tileLayer);


        const texture = Texture.from(`${Config.backgrounds.buildings.layers[1].name}`);
        const buildings = Sprite.from(texture);
        buildings.scale.set(Config.backgrounds.buildings.layers[1].scale);
        buildings.anchor.set(0.5);
        buildings.x = Config.backgrounds.buildings.layers[1].x;
        buildings.y = Config.backgrounds.buildings.layers[1].y;

        this.layerSprites.push(buildings);

        this.addChild(buildings);

        /*for (const layer of Config.backgrounds.buildings.layers) {
            console.log("= layer", layer);
            const texture = Texture.from(`background-buildings/${layer.name}`);

            const sprite = Sprite.from(texture);
            sprite.scale.set(layer.scale);
            sprite.anchor.set(0.5);
            sprite.x = layer.x;
            sprite.y = layer.y;

            this.layerSprites.push(sprite);

            this.addChild(sprite);
        }*/

    }

}