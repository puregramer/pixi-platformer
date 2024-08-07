import { Container } from 'pixi.js';
import ParallaxBackground from '../components/ParallaxBackground';
import { Config } from '../config';
import {Player} from "../components/Player";
import { EggTurret } from '../components/enemy/EggTurret';

export class GameScreen extends Container {
    public static assetBundles = [ 'common', 'game'];
    public readonly gameContainer: Container;
    readonly background: ParallaxBackground;
    private readonly player: Player;
    eggTurret: EggTurret;

    constructor() {
        super();
        this.gameContainer = new Container();
        this.addChild(this.gameContainer);

        this.background = new ParallaxBackground(Config.backgrounds.walls);

        this.player = new Player(this.background.tileSprite!);
        this.player.scale.set(0.7);

        this.player.x = window.innerWidth / 2;
        this.player.y = window.innerHeight - this.player.height;

        this.background.initPlayerMovement(this.player);

        this.eggTurret = new EggTurret();

        this.gameContainer.addChild(this.background, this.player);

    }

    public resize(width: number, height: number) {
        if (this.player) {
            this.player.x = width / 2;
            this.player.y = height - this.player.height;
        }

        /*if (this.background) {
            this.background.resize(width, height);
        }*/
    }

}