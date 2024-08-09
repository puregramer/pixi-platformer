import { Container, Sprite, Texture, TilingSprite } from 'pixi.js';
import { Config } from '../../config';

export default class Intro extends Container {
    layerSprites: Sprite[] = [];

    constructor() {
        super();

        for (let i = 0; i < Config.backgrounds.buildings.bg.length; i++) {
            const texture = Texture.from(`background-buildings/${Config.backgrounds.buildings.bg[i]}.png`);
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
            texture: Texture.from(`background-buildings/${Config.backgrounds.buildings.layers[0].name}.png`),
            width: Config.width,
            height: 124,
        });
        tileLayer.y = Config.height - 124;
        this.addChild(tileLayer);


        const texture = Texture.from(`background-buildings/${Config.backgrounds.buildings.layers[1].name}.png`);
        const buildings = Sprite.from(texture);
        buildings.scale.set(Config.backgrounds.buildings.layers[1].scale);
        buildings.anchor.set(0.5);
        buildings.x = Config.backgrounds.buildings.layers[1].x;
        buildings.y = Config.backgrounds.buildings.layers[1].y;

        this.layerSprites.push(buildings);

        this.addChild(buildings);


    }

}