import { Container } from 'pixi.js';
import SpritesheetAnimation from '../SpritesheetAnimation';
import { AnimState } from '../Player';

export class EggTurret extends Container {
    anim: SpritesheetAnimation;
    currentState: AnimState | null = null;

    static animStates: Record<string, AnimState> = {
        idle: {
            anim: "Idle",
            loop: true,
            speed: 0.13,
        },
        shoot: {
            anim: "Shoot",
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
            ease: "sine",
        }
    };

    state = {
        shooting: false,
        velocity: {
            x: 0,
            y: 0,
        },
    };

    constructor() {
        super();
        this.anim = new SpritesheetAnimation("enemy-eggTurret");

        this.addChild(this.anim);

        this.setState(EggTurret.animStates.idle);

    }

    setState(state: AnimState) {
        this.currentState = state;
        return this.anim.play(state);
    }

}