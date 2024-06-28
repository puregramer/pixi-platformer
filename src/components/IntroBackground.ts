import { Container, Texture, TilingSprite } from 'pixi.js';
import { Backgrounds, Config } from '../config';

export default class IntroBackground extends Container {
    // private layers = [];
    private tilingSprites: TilingSprite[] = [];

    constructor(
        private config: Backgrounds = {
            layers: [],
            bg: [],
            panSpeed: 1,
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
                height: texture.height
            });

            tilingSprite.scale.set(scaleFactor);

            tilingSprite.anchor.set(0.5);

            this.tilingSprites.push(tilingSprite);

            this.addChild(tilingSprite);
        }
    }

    resize(width: number, height: number) {
        console.log('== [resize] introBg resize ', width, height);
    }

}