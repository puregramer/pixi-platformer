import { Container } from 'pixi.js';
import ParallaxBackground from '../components/ParallaxBackground';
import { Config } from '../config';

export class GameScreen extends Container {
    public static assetBundles = [ 'common', 'game'];
    public readonly gameContainer: Container;

    private background: ParallaxBackground;

    constructor() {
        super();
        this.gameContainer = new Container();
        this.addChild(this.gameContainer);

        this.background = new ParallaxBackground(Config.backgrounds.walls);
        this.gameContainer.addChild(this.background);

    }

   /* public resize(width: number, height: number) {

    }*/

}