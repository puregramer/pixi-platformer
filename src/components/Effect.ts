import { Container } from 'pixi.js';
import SpritesheetAnimation from './SpritesheetAnimation';
import { AnimState } from './Player';


export default class Effect extends Container {
    private anim: SpritesheetAnimation;
    currentState: AnimState | null = null;

    static animStates: Record<string, AnimState> = {
        shot: {
            anim: "shot",
            loop: true,
            speed: 0.2,
        },
        shotHit: {
            anim: "shot-hit",
            // soundName: "jump",
            loop: false,
            speed: 0.2,
        },
        explosion: {
            anim: "explosion",
            loop: false,
            speed: 0.2,
        },
    };

    config = {
        shot: {
            moveX: 10,
            speedMultiplier: 4, // 6
            duration: 0.3,
            ease: "sine",
        },
        shotHit: {
            duration: 0.2,
            ease: "sine",
        },
        explosion: {
            duration: 0.2,
            ease: "sine",
        }
    };

    state = {
        jumping: false,
        dashing: false,
        shooting: false,
        dashShooting: false,
        velocity: {
            x: 0,
            y: 0,
        },
    };

    constructor() {
        super();

        this.anim = new SpritesheetAnimation("effect");
        this.addChild(this.anim);

    }

    setState(state: AnimState) {
        this.currentState = state;
        return this.anim.play(state);
    }


    


}