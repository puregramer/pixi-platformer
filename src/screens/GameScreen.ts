import { Container } from 'pixi.js';
import ParallaxBackground from '../components/ParallaxBackground';
import { Config } from '../config';
import {Player} from "../components/Player";

export class GameScreen extends Container {
    public static assetBundles = [ 'common', 'game'];
    public readonly gameContainer: Container;

    readonly background: ParallaxBackground;
    private readonly player: Player;

    constructor() {
        super();
        this.gameContainer = new Container();
        this.addChild(this.gameContainer);

        this.background = new ParallaxBackground(Config.backgrounds.walls);

        this.player = new Player();
        this.player.x = window.innerWidth / 2;
        this.player.y = window.innerHeight - this.player.height / 0.75;

        this.background.initPlayerMovement(this.player);

        this.gameContainer.addChild(this.background, this.player);

    }

    public resize(width: number, height: number) {
        if (this.player) {
            this.player.x = width / 2;
            this.player.y = height - this.player.height / 0.75;
        }

        /*if (this.background) {
            this.background.resize(width, height);
        }*/
    }

}