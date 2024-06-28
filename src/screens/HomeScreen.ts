import { Container } from 'pixi.js';
import TextButton from '../components/button/TextButton';
import { navigation } from '../utils/navigation';
import { GameScreen } from './GameScreen';
import IntroBackground from '../components/IntroBackground';
import { Config } from '../config';

export class HomeScreen extends Container{
    /** Assets bundles required by this screen */
    public static assetBundles = ['common'];
    private background: IntroBackground;
    private startButton: TextButton;

    constructor() {
        super();

        this.background = new IntroBackground(Config.backgrounds.buildings);
        this.addChild(this.background);

        this.startButton = new TextButton();

        this.startButton.onPress.connect(() => navigation.showScreen(GameScreen));
        this.addChild(this.startButton);
    }

    /** Resize the screen, fired whenever window size changes  */
    public resize(width: number, height: number) {
        this.startButton.x = width * 0.45;
        this.startButton.y = height * 0.75;
    }

}