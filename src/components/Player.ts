import gsap from "gsap";
import { Container } from "pixi.js";
import SpritesheetAnimation from "./SpritesheetAnimation";
import Keyboard from "../utils/Keyboard";
import { waitFor } from '../utils/asyncUtils';

const Directions = {
    LEFT: -1,
    RIGHT: 1,
    UP: -1,
    DOWN: 1
}

type AnimState = {
    anim: string;
    soundName?: string;
    loop?: boolean;
    speed?: number;
};

/**
 * Example class showcasing the usage of the```Animation``` and ```Keyboard``` classes
 */
export class Player extends Container {
    private keyboard = Keyboard.getInstance();
    anim: SpritesheetAnimation;
    currentState: AnimState | null = null;

    static animStates: Record<string, AnimState> = {
        idle: {
            anim: "idle",
            loop: true,
            speed: 0.13,
        },
        jump: {
            anim: "jump",
            soundName: "jump",
            loop: false,
            speed: 0.11,
        },
        walk: {
            anim: "walk",
            loop: true,
            speed: 0.35,
        },
        dash: {
            anim: "run",
            // soundName: "dash",
            loop: true,
            speed: 0.35,
        },
    };

    config = {
        speed: 5,
        turnDuration: 0,
        decelerateDuration: 0.1,
        scale: 0.7,
        jump: {
            height: 50,
            duration: 0.3,
            ease: "sine",
        },
        dash: {
            speedMultiplier: 6,
            duration: 0.5,
        },
    };

    state = {
        jumping: false,
        dashing: false,
        velocity: {
            x: 0,
            y: 0,
        },
    };

    private decelerationTween?: gsap.core.Tween;

    constructor() {
        super();

        this.anim = new SpritesheetAnimation("player");

        this.addChild(this.anim);

        this.setState(Player.animStates.idle);

        this.keyboard.onAction(({ action, buttonState }) => {
            if (buttonState === "pressed") this.onActionPress(action);
            else if (buttonState === "released") this.onActionRelease(action);
        });
    }

    setState(state: AnimState) {
        this.currentState = state;

        return this.anim.play(state);
    }

    private onActionPress(action: keyof typeof Keyboard.actions) {
        switch (action) {
            case "LEFT":
                this.moveX(Directions.LEFT);
                break;
            case "RIGHT":
                this.moveX(Directions.RIGHT);
                break;
            case "UP":
                this.moveY(Directions.UP);
                break;
            case "DOWN":
                this.moveY(Directions.DOWN);
                break;
            case "JUMP":
                this.jump();
                break;
            case "DASH":
                this.dash();
                break;

            default:
                break;
        }
    }

    onActionRelease(action: keyof typeof Keyboard.actions) {
        if (
            (action === "LEFT" && this.state.velocity.x < 0) ||
            (action === "RIGHT" && this.state.velocity.x > 0) ||
            (action === "UP" && this.state.velocity.y < 0) ||
            (action === "DOWN" && this.state.velocity.y > 0)
        ) {
            this.stopMovement();
        }
    }

    get jumping() {
        return this.state.jumping;
    }

    private set jumping(value: boolean) {
        this.state.jumping = value;
        this.updateAnimState();
    }

    private set dashing(value: boolean) {
        this.state.dashing = value;
        this.updateAnimState();
    }

    get dashing() {
        return this.state.dashing;
    }

    private updateAnimState() {
        const { walk, jump, dash, idle } = Player.animStates;

        if (this.dashing) {
            if (this.currentState === dash) return;

            this.setState(dash);
        } else if (this.jumping) {
            if (this.currentState === jump || this.currentState === dash) return;

            this.setState(jump);
        } else if (this.state.velocity.x !== 0 || this.state.velocity.y !== 0) {
            if (this.currentState === walk) return;

            this.setState(walk);
        } else {
            if (this.currentState === idle) return;

            this.setState(idle);
        }
    }

    stopMovement() {
        this.decelerationTween?.progress(1);

        this.decelerationTween = gsap.to(this.state.velocity, {
            duration: this.config.decelerateDuration,
            x: 0,
            y: 0,
            ease: "power1.in",
            onComplete: () => {
                this.updateAnimState();
            },
        });
    }

    async moveX(direction: number) {
        if (this.dashing) return;

        this.decelerationTween?.progress(1);

        this.state.velocity.x = direction * this.config.speed;

        this.updateAnimState();

        gsap.to(this.scale, {
            duration: this.config.turnDuration,
            x: this.config.scale * direction,
        });
    }

    async moveY(direction: number) {
        if (this.dashing) return;

        this.decelerationTween?.progress(1);

        this.state.velocity.y = direction * this.config.speed;

        this.updateAnimState();

        /*gsap.to(this.scale, {
            duration: this.config.turnDuration,
            y: this.config.scale * direction,
        });*/
    }

    async dash() {
        if (this.state.velocity.x === 0) return;

        this.dashing = true;

        this.decelerationTween?.progress(1);

        this.state.velocity.x =
            this.config.speed *
            this.config.dash.speedMultiplier *
            this.getDirection();

        await waitFor(this.config.dash.duration);

        this.state.velocity.x = this.config.speed * this.getDirection();

        this.dashing = false;
    }

    private getDirection() {
        if (this.state.velocity.x === 0)
            return this.scale.x > 0 ? Directions.RIGHT : Directions.LEFT;

        return this.state.velocity.x > 0 ? Directions.RIGHT : Directions.LEFT;
    }

    async jump() {
        if (this.jumping) return;

        const { height, duration, ease } = this.config.jump;

        this.jumping = true;

        await gsap.to(this, {
            duration,
            y: `-=${height}`,
            ease: `${ease}.out`,
            yoyo: true,
            yoyoEase: `${ease}.in`,
            repeat: 1,
        });

        this.jumping = false;
    }
}
