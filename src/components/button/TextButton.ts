import { ButtonContainer } from '@pixi/ui';
import { Color, FillGradient, Text, TextStyle } from 'pixi.js';

export default class TextButton extends ButtonContainer {
    private buttonText: Text;

    constructor() {
        super();

        const fill = new FillGradient(0, 0, 0, 36 * 1.7 * 7);
        const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());
        colors.forEach((number, index) => {
            const ratio = index / colors.length;

            fill.addColorStop(ratio, number);
        });
        const style = new TextStyle({
            fontFamily: 'PixAntiqua',
            fontSize: 20,
            fontStyle: 'italic',
            // fontWeight: 'bold',
            fill: { fill },
            stroke: { color: '#333', width: 3, join: 'round' },
            dropShadow: {
                color: '#000',
                blur: 7,
                angle: Math.PI / 6,
                distance: 6,
            },
            wordWrap: true,
            wordWrapWidth: 440,
        });

        this.buttonText = new Text({
            text: 'START',
            style
        });
        // this.buttonText.x = 0.5;
        // this.buttonText.y = 0.5;
        this.addChild(this.buttonText);
    }

}