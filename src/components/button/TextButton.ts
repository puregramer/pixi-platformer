import { ButtonContainer } from '@pixi/ui';
import { Text } from 'pixi.js';

export default class TextButton extends ButtonContainer {
    private buttonText: Text;

    constructor() {
        super();

        this.buttonText = new Text({
            text: 'START',
            style: {
                fontFamily: 'PixAntiqua',
                fontSize: 35,
                fill: '#333',
            }
        });
        // this.buttonText.x = 0.5;
        // this.buttonText.y = 0.5;
        this.addChild(this.buttonText);
    }

}