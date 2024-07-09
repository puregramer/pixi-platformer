import { Container, Sprite, Texture } from 'pixi.js';

export default class Intro extends Container {
    private bgList = [
        'skyline-a',
        'skyline-a',
        'skyline-b',
        'skyline-a',
    ];
    private bgWidth = 120;

    constructor() {
        super();

        for (let i = 0; i < this.bgList.length; i++) {
            const texture = Texture.from(`background-buildings/${this.bgList[i]}`);
            console.log("= texture", texture);
            // console.log("= x y ", aPosition[i], aPosition[i + 1]);
            const sprite = Sprite.from(texture);
            sprite.scale.set(1);
            sprite.x = i * this.bgWidth;


            this.addChild(sprite);

        }

    }

}