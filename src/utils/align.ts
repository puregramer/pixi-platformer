import { Container, Sprite } from 'pixi.js';
import { Config } from '../config';

export function centerObjects(...toCenter: Container<any>[]) {
    const center = (obj: Container<any>) => {
        obj.x = Config.width / 2 - obj.width / 2;
        obj.y = Config.height / 2;

        if (obj instanceof Sprite) {
            obj.anchor.set(0.5);
        }
    };

    toCenter.forEach(center);
}
