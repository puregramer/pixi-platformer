import { Container } from 'pixi.js';
import TextButton from '../components/button/TextButton';
import { navigation } from '../utils/navigation';
import { GameScreen } from './GameScreen';
import Intro from '../components/stage/Intro';

export class HomeScreen extends Container{
    /** Assets bundles required by this screen */
    public static assetBundles = ['common'];
    private background: Intro;
    private startButton: TextButton;

    constructor() {
        super();

        // this.background = new IntroBackground(Config.backgrounds.buildings);
        this.background = new Intro();
        this.addChild(this.background);

        this.startButton = new TextButton();

        this.startButton.onPress.connect(() => navigation.showScreen(GameScreen));
        this.addChild(this.startButton);
    }

    /** Resize the screen, fired whenever window size changes  */
    public resize(width: number, height: number) {
        this.startButton.x = (width / 2) - (this.startButton.width / 2);
        this.startButton.y = height * 0.7;
    }

}