import { Container, Sprite } from "pixi.js";

export function centerObjects(...toCenter: Container<any>[]) {
    const center = (obj: Container<any>) => {
        obj.x = window.innerWidth / 2;
        obj.y = window.innerHeight / 2;

        if (obj instanceof Sprite) {
            obj.anchor.set(0.5);
        }
    };

    toCenter.forEach(center);
}