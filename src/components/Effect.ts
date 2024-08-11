import { Container, Ticker } from 'pixi.js';
import SpritesheetAnimation from './SpritesheetAnimation';
import { AnimState } from './Player';
import { Config } from '../config';
import { collisionCheck } from '../utils/collision';

export default class Effect extends Container {
    private anim: SpritesheetAnimation;
    currentState: AnimState | null = null;

    static animStates: Record<string, AnimState> = {
        shot: {
            anim: 'shot',
            loop: true,
            speed: 0.2,
        },
        shotHit: {
            anim: 'shot-hit',
            // soundName: "jump",
            loop: false,
            speed: 0.2,
        },
        explosion: {
            anim: 'explosion',
            loop: false,
            speed: 0.2,
        },
    };

    config = {
        shot: {
            scale: 0.5,
            speedMultiplier: 0.3,
        },
        shotHit: {
            duration: 0.2,
            ease: 'sine',
        },
        explosion: {
            duration: 0.2,
            ease: 'sine',
        },
    };

    state = {
        velocity: {
            x: 1,
            y: 0,
        },
    };

    constructor(effectName: string, direction: number) {
        super();
        this.anim = new SpritesheetAnimation('effect');
        this.addChild(this.anim);
        this.playEffect(effectName, direction);
    }

    playEffect(effectName: string, direction: number) {
        this.setState(Effect.animStates[effectName]);
        switch (effectName) {
            case 'shot':
                this.animateShot(direction);
                break;
        }
    }

    async animateShot(direction: number) {
        // console.log("== direction ", direction);
        const { scale, speedMultiplier } = this.config.shot;
        this.scale.set(scale);
        Ticker.shared.add((delta) => {
            const x = this.state.velocity.x * delta.deltaMS * direction;
            this.updatePosition(x, speedMultiplier);
        });
    }

    updatePosition(x: number, speed: number) {
        if (this.destroyed) return;
        this.x += x * speed;
        console.log("= ", this.parent?.parent.getChildByName('Enemy'));


        const target = this.parent?.parent?.enemy.enemies[0];
        console.log('=== collisionCheck', collisionCheck(this, target));
        if (Config.width / 2 < Math.abs(this.x - Config.width / 2)) {
            this.destroy();
            console.log('==== destroyed effect');
        }
    }

    setState(state: AnimState) {
        // console.log("==== effect state", state);
        this.currentState = state;
        return this.anim.play(state);
    }
}
