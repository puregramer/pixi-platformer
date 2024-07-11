import { Container, TilingSprite, Ticker, Texture, Sprite } from 'pixi.js';
import { centerObjects } from "../utils/align";
import { Backgrounds, Config } from '../config';

export default class ParallaxBackground extends Container {
    tilingSprites: TilingSprite[] = [];
    sprites: Sprite[] = [];

    constructor(
        protected config: Backgrounds = {
            panSpeed: 1,
            bg: [],
            layers: [],
            tile: []
        }
    ) {
        super();

        this.init();

        // centerObjects(this);
    }

    init() {

        const textureBg1 = Texture.from(`background-walls/${this.config.bg[0]}`);
        const textureBg2 = Texture.from(`background-walls/${this.config.bg[1]}`);
        const scaleFactor = Config.height / textureBg1.height;
        const tempSprite1 = Sprite.from(textureBg1);
        const tempSprite2 = Sprite.from(textureBg2);

        tempSprite2.x = 47;
        tempSprite1.addChild(tempSprite2);
        const tilingSprite = new TilingSprite({
            texture: tempSprite1.texture,
            width: Config.width,
            height: Config.height,
            tileScale: { x: scaleFactor, y: scaleFactor },
        });
        this.addChild(tilingSprite);
        // this.addChild(tempSprite1);

        /*for (const bg of this.config.bg) {
            console.log("= bg", bg);
            const texture = Texture.from(`background-walls/${bg}`);
            console.log("= texture", texture);

            const scaleFactor = Config.height / texture.height;
            const tilingSprite = new TilingSprite({
                texture,
                width: Config.width,
                height: Config.height,
                tileScale: { x: scaleFactor, y: scaleFactor },
            });

            tilingSprite.scale.set(scaleFactor);
            console.log("= tilingSprite scale", scaleFactor);
            // tilingSprite.anchor.set(0, 0.5);
            // tilingSprite.anchor.set(0.5);
            // tilingSprite.x = 0;
            // tilingSprite.y = 0;


            this.tilingSprites.push(tilingSprite);

            this.addChild(tilingSprite);
        }*/

        for (const layer of Config.backgrounds.walls.layers) {
            console.log('= layer', layer);
            const texture = Texture.from(`background-walls/${layer.name}`);

            const sprite = Sprite.from(texture);
            sprite.scale.set(layer.scale);
            // sprite.anchor.set(0.5);
            sprite.x = layer.x;
            sprite.y = layer.y;

            this.sprites.push(sprite);

            this.addChild(sprite);
        }
    }

    initPlayerMovement(object: {
        state: { velocity: { x: number; y: number } };
    }) {
        Ticker.shared.add((delta) => {
            const x = object.state.velocity.x * delta.deltaMS;
            const y = object.state.velocity.y * delta.deltaMS;

            this.updatePosition(x, y);
        });
    }

    updatePosition(x: number, y: number) {
        for (const [index, child] of this.children.entries()) {
            if (child instanceof TilingSprite) {
                child.tilePosition.x -= x * index * this.config.panSpeed;
                child.tilePosition.y -= y * index * this.config.panSpeed;
            } else {
                child.x -= x * index * this.config.panSpeed;
                child.y -= y * index * this.config.panSpeed;
            }
        }
    }

    resize(width: number, height: number) {
        console.log("= resize", width, height);
        for (const layer of this.sprites) {
            const scaleFactor = height / layer.texture.height;

            layer.width = width / scaleFactor;
            layer.scale.set(scaleFactor);
        }

        centerObjects(this);
    }
}