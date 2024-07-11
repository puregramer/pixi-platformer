import { Container, Sprite, Texture, TilingSprite } from 'pixi.js';
import { Backgrounds, Config } from '../config';

export default class IntroBackground extends Container {
    // private layers = [];
    tilingSprites: TilingSprite[] = [];
    layerSprites: Sprite[] = [];

    constructor(
        private config: Backgrounds = {
            layers: [],
            bg: [],
            panSpeed: 1,
            tile: []
        }
    ) {
        super();
        this.init();
    }

    init() {
        for (const bg of this.config.bg) {
            console.log("= bg", bg);
            const texture = Texture.from(`background-buildings/${bg}`);
            console.log("= texture", texture);

            const scaleFactor = Config.width / texture.height;
            console.log("= scaleFactor", scaleFactor);
            const tilingSprite = new TilingSprite({
                texture,
                width: Config.width,
                height: Config.height,
                tileScale: { x: 0.95, y: 0.95 },
            });

            tilingSprite.scale.set(scaleFactor);

            tilingSprite.anchor.set(0.5);

            this.tilingSprites.push(tilingSprite);

            this.addChild(tilingSprite);
        }

        for (const layer of this.config.layers) {
            console.log("= layer", layer);
            const texture = Texture.from(`background-buildings/${layer}`);

            const sprite = Sprite.from(texture);

            // sprite.scale.set(0.5);
            // sprite.anchor.set(0.5);
            this.layerSprites.push(sprite);

            this.addChild(sprite);
        }
    }

    resize(width: number, height: number) {
        console.log('== [resize] introBg resize ', width, height);
    }

}