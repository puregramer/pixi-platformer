// import {sound} from "@pixi/sound";
import {AnimatedSprite, Assets, Container, Texture} from "pixi.js";
import {sfx} from "../utils/audio";

type Play = {
    anim: string;
    soundName?: string;
    loop?: boolean;
    speed?: number;
};

export default class SpritesheetAnimation extends Container {
    animationTextures: Map<string, AnimatedSprite["textures"]>;
    sprite?: AnimatedSprite;
    speed = 1;

    animations = new Map<string, AnimatedSprite>();

    currentAnimation: string | null = null;

    constructor(name: string, speed = 1) {
        super();

        this.speed = speed;
        // this.animationTextures = Assets.get(name).animations;
        this.animationTextures = this.getAnimations(name);
        console.log("== [animationTextures] ", this.animationTextures);
    }

    private getAnimations(aniName: string): Map<string, AnimatedSprite["textures"]> {
        console.log('== getAnimations ', aniName);

        const animations = new Map<string, Texture[]>();
        for (const texture of Assets.cache['_cache'].entries()) {
            const name = texture[0].split('/');
            if (name[0] !== aniName) continue;
            if (!animations.has(name[1])) {
                animations.set(name[1], []);
            }
            animations.get(name[1])?.push(texture[1]);
            animations.set(name[1], animations.get(name[1])!.sort((a: Texture, b: Texture): number => {
                if (a.label && b.label) {
                    const numberA = a.label.match(/[0-9]+/g);
                    const numberB = b.label.match(/[0-9]+/g);
                    if (Number(numberA![0]) < Number(numberB![0])) {
                        return -1;
                    }
                    if (Number(numberA![0]) > Number(numberB![0])) {
                        return 1;
                    }
                }
                return 0;
            }));
        }
        return animations;
    }

    private initAnimation(anim: string) {
        const textures = this.animationTextures.get(anim);

        if (!textures) {
            console.error(`Animation ${anim} not found`);
            return;
        }

        const sprite = new AnimatedSprite(textures);

        sprite.anchor.set(0.5);
        sprite.animationSpeed = this.speed;

        return sprite;
    }

    play({anim, soundName, loop = false, speed = this.speed}: Play) {
        if (this.sprite) {
            this.sprite.stop();
            this.removeChild(this.sprite);
        }

        this.sprite = this.animations.get(anim);

        if (!this.sprite) {
            this.sprite = this.initAnimation(anim);

            if (!this.sprite) return;

            this.animations.set(anim, this.sprite);
        }

        this.currentAnimation = anim;

        this.sprite.loop = loop;
        this.sprite.animationSpeed = speed;
        this.sprite.gotoAndPlay(0);

        // if (soundName) sound.play(soundName);
        if (soundName) sfx.play(`game/${soundName}.ogg`);

        this.addChild(this.sprite);

        return new Promise<void>((resolve) => {
            if (!this.sprite) return resolve();

            this.sprite.onComplete = () => {
                this.currentAnimation = null;

                resolve();
            };
        });
    }
}
