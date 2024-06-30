import { Container, TilingSprite, Ticker, Texture } from "pixi.js";
import { centerObjects } from "../utils/align";
import { Backgrounds, Config } from '../config';

export default class ParallaxBackground extends Container {
    // name = "Background";

    layers: string[] = [];
    tilingSprites: TilingSprite[] = [];

    constructor(
        protected config: Backgrounds = {
            panSpeed: 1,
            bg: [],
            layers: [],
        }
    ) {
        super();

        this.init();

        // centerObjects(this);
    }

    init() {
        for (const bg of this.config.bg) {
            console.log("= bg", bg);
            const texture = Texture.from(`background-walls/${bg}`);
            console.log("= texture", texture);

            const scaleFactor = Config.width / texture.height;
            const tilingSprite = new TilingSprite({
                texture,
                width: Config.width,
                height: Config.height
            });

            tilingSprite.scale.set(scaleFactor);

            // tilingSprite.name = layer;
            tilingSprite.anchor.set(0.5);

            this.tilingSprites.push(tilingSprite);

            this.addChild(tilingSprite);
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
        for (const layer of this.tilingSprites) {
            const scaleFactor = height / layer.texture.height;

            layer.width = width / scaleFactor;
            layer.scale.set(scaleFactor);
        }

        centerObjects(this);
    }
}
