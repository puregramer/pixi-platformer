import { Container, TilingSprite, Ticker, Texture, Sprite } from 'pixi.js';
// import { centerObjects } from "../utils/align";
import { Backgrounds, Config } from '../config';

export default class ParallaxBackground extends Container {
    tilingSprites: TilingSprite[] = [];
    sprites: Sprite[] = [];
    private tileTexture: Texture | undefined;
    tileSprite: TilingSprite | undefined;

    constructor(
        protected config: Backgrounds = {
            panSpeed: 1,
            bg: [],
            layers: [],
            tile: [],
        },
    ) {
        super();
        this.name = 'background';
        this.init();

        // centerObjects(this);
    }

    init() {
        //todo  background.interactiveChildren = false // visible ?

        for (const bg of this.config.bg) {
            console.log('= bg', bg);
            const texture = Texture.from(`background-walls/${bg}.png`);
            console.log('= texture', texture);

            // const scaleFactor = Config.height / texture.height;
            const tilingSprite = new TilingSprite({
                texture,
                width: Config.width,
                height: Config.height,
                // tileScale: { x: scaleFactor, y: scaleFactor },
            });

            tilingSprite.scale.set(1);
            // console.log("= tilingSprite scale", scaleFactor);
            // tilingSprite.anchor.set(0, 0.5);
            // tilingSprite.anchor.set(0.5);
            // tilingSprite.x = 0;
            // tilingSprite.y = 0;

            this.tilingSprites.push(tilingSprite);

            this.addChild(tilingSprite);
        }

        this.tileTexture = Texture.from(`background-walls/${Config.backgrounds.walls.tile[0]}.png`);
        this.tileSprite = new TilingSprite({
            texture: this.tileTexture,
            width: Config.width,
            height: this.tileTexture.height,
        });
        this.tileSprite.y = Config.height - 30;

        this.addChild(this.tileSprite);

        for (const layer of Config.backgrounds.walls.layers) {
            console.log('= layer', layer);
            const texture = Texture.from(`background-walls/${layer.name}.png`);

            const sprite = Sprite.from(texture);
            sprite.scale.set(layer.scale);
            // sprite.anchor.set(0.5);
            sprite.x = layer.x;
            sprite.y = layer.y;

            this.sprites.push(sprite);

            this.addChild(sprite);
        }
    }

    initPlayerMovement(object: { state: { velocity: { x: number; y: number } } }) {
        Ticker.shared.add((delta) => {
            const x = object.state.velocity.x * delta.deltaMS;
            const y = object.state.velocity.y * delta.deltaMS;

            // console.log("=x ", x);
            this.updatePosition(x, y);
        });
    }

    updatePosition(x: number, y: number) {
        for (const child of this.children.values()) {
            if (child instanceof TilingSprite) {
                child.tilePosition.x -= x * this.config.panSpeed;
                child.tilePosition.y -= y * this.config.panSpeed;
            } else {
                child.x -= x * this.config.panSpeed;
                child.y -= y * this.config.panSpeed;
            }
        }
    }

    /*collisionCheck(object: {x: number, y: number}) {
        Ticker.shared.add((delta) => {
           console.log("= collisionCheck", delta, object.x, object.y);
            // if (object.y > 180) object.y = 180;

        });
    }*/

    resize(width: number, height: number) {
        console.log('= resize', width, height);
        /*for (const layer of this.sprites) {
            const scaleFactor = height / layer.texture.height;

            layer.width = width / scaleFactor;
            layer.scale.set(scaleFactor);
        }*/

        // centerObjects(this);
    }
}
