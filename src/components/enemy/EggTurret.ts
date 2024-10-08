import SpritesheetAnimation from '../SpritesheetAnimation';
import { AnimState } from '../Player';
import {EnemyOptions } from './Enemy';
import { waitFor } from '../../utils/asyncUtils';
import { Container } from 'pixi.js';

export abstract class BaseEnemy extends Container {
    protected constructor() {
        super();
    }
    public setHurt() {}
}

export class EggTurret extends BaseEnemy {
    anim: SpritesheetAnimation;
    currentState: AnimState | null = null;

    static animStates: Record<string, AnimState> = {
        idle: {
            anim: 'Idle',
            loop: true,
            speed: 0.2,
        },
        shoot: {
            anim: 'Shoot',
            loop: false,
            speed: 0.2,
        },
    };

    config = {
        speed: 5,
        turnDuration: 0,
        decelerateDuration: 0.2,
        scale: 0.7,
        shoot: {
            duration: 0.2,
            ease: 'sine',
        },
    };

    state = {
        shooting: false,
        velocity: {
            x: 0,
            y: 0,
        },
    };

    constructor({ x, y }: EnemyOptions) {
        super();
        this.anim = new SpritesheetAnimation('enemy-eggTurret');

        this.x = x;
        this.y = y;
        this.scale.set(this.config.scale);
        // this.zIndex = 1;
        this.addChild(this.anim);

        this.setState(EggTurret.animStates.idle);

    }

    setState(state: AnimState) {
        this.currentState = state;
        return this.anim.play(state);
    }

    async setHurt() {
        this.tint = 0xff0000;
        await waitFor(0.1);
        this.tint = 0xffffff;
    }
}
