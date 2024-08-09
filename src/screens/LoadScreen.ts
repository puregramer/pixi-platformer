import { Container, Text, TextStyle, Color, FillGradient } from 'pixi.js';
import gsap from 'gsap';
import { TiledBackground } from '../components/TiledBackground';

/** Screen shown while loading assets */
export class LoadScreen extends Container {
    /** Assets bundles required by this screen */
    public static assetBundles = ['preload'];
    /** LThe loading message display */
    private message: Text;


    constructor() {
        super();

        this.addChild(new TiledBackground());

        const fill = new FillGradient(0, 0, 0, 36 * 1.7 * 7);
        const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());
        colors.forEach((number, index) => {
            const ratio = index / colors.length;

            fill.addColorStop(ratio, number);
        });
        const style = new TextStyle({
            fontFamily: 'PixAntiqua Regular',
            fontSize: 20,
            fontStyle: 'italic',
            // fontWeight: 'bold',
            fill: { fill },
            stroke: { color: '#333', width: 3, join: 'round' },
            dropShadow: {
                color: '#333',
                blur: 4,
                angle: Math.PI / 6,
                distance: 6,
            },
            wordWrap: true,
            wordWrapWidth: 440,
        });

        this.message = new Text({
            text: 'LOADING...',
            style,
        });
        this.message.anchor.set(0.5);
        this.addChild(this.message);
    }

    /** Resize the screen, fired whenever window size changes  */
    public resize(width: number, height: number) {
        console.log('[loadScreen] resize] ');
        this.message.x = width * 0.5;
        this.message.y = height * 0.75;

    }

    /**
     * Called every frame
     * @param time - Ticker object with time related data.
     */
    /*public update(time: Ticker) {
        const delta = time.deltaTime;

        // Rotate spinner
        this.spinner.rotation -= delta / 30;

    }*/

    /** Show screen with animations */
    public async show() {
        gsap.killTweensOf(this.message);
        this.message.alpha = 1;
    }

    /** Hide screen with animations */
    public async hide() {
        // Change then hide the loading message
        this.message.text = 'Loading Complete!';
        gsap.killTweensOf(this.message);
        gsap.to(this.message, {
            alpha: 0,
            duration: 0.3,
            ease: 'linear',
            delay: 0.5,
        });
    }
}
