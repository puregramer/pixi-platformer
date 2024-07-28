import gsap from "gsap";
import { Container, TilingSprite } from 'pixi.js';
import SpritesheetAnimation from "./SpritesheetAnimation";
import Keyboard from "../utils/Keyboard";
import { collisionTileCheck } from '../utils/collision';

export const Directions = {
    LEFT: -1,
    RIGHT: 1,
    UP: 1,
    DOWN: -1
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
    backgroundTile: TilingSprite;

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
        shoot: {
            anim: "shoot",
            loop: false,
            speed: 0.2,
        },
        dashShoot: {
            anim: "run-shoot",
            loop: false,
            speed: 0.35,
        }
    };

    config = {
        speed: 5,
        turnDuration: 0,
        decelerateDuration: 0.2,
        scale: 0.7,
        jump: {
            height: 60,
            duration: 0.3,
            ease: "sine",
        },
        upDown: {
            duration: 0.2,
            moveY: 3,
            ease: "sine",
        },
        dash: {
            speedMultiplier: 4, // 6
            duration: 0.5,
        },
        shoot: {
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

    private decelerationTween?: gsap.core.Tween;

    constructor(backgroundTile: TilingSprite) {
        super();
        this.backgroundTile = backgroundTile;
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
        const { dash} = Player.animStates;
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
            case "SHOOT":
                if (this.currentState === dash) {
                    this.dashShoot();
                } else {
                    this.shoot();
                }
                break;

            default:
                break;
        }
    }

    async onActionRelease(action: keyof typeof Keyboard.actions) {
        if (
            (action === "LEFT" && this.state.velocity.x < 0) ||
            (action === "RIGHT" && this.state.velocity.x > 0)
            || action === 'DASH'
        ) {
            if (this.dashing) {
                this.state.velocity.x = this.config.speed * this.getDirection();
                this.dashing = false;
            } else {
                this.stopMovement();
            }
        }
    }

    get jumping() {
        return this.state.jumping;
    }
    private set jumping(value: boolean) {
        this.state.jumping = value;
        this.updateAnimState();
    }

    get dashing() {
        return this.state.dashing;
    }
    private set dashing(value: boolean) {
        this.state.dashing = value;
        this.updateAnimState();
    }

    get shooting() {
        return this.state.shooting;
    }
    private set shooting(value: boolean) {
        this.state.shooting = value;
        this.updateAnimState();
    }

    get dashShooting() {
        return this.state.dashShooting;
    }
    private set dashShooting(value: boolean) {
        this.state.dashShooting = value;
        this.updateAnimState();
    }

    private updateAnimState() {
        const { walk, jump, dash, idle, shoot, dashShoot  } = Player.animStates;
        // console.log("== currentState ", this.currentState);

        if (this.dashing) {
            // if (this.currentState === dash) return;
            if (this.jumping) {
                this.setState(jump);
            } else if (this.dashShooting) {
                if (this.currentState === dashShoot) return;
                this.setState(dashShoot);
            } else {
                this.setState(dash);
            }
        } else if (this.dashShooting) {
            if (this.currentState === dashShoot) return;
            this.setState(dashShoot);
        } else if (this.jumping) {
            if (this.currentState === jump) return;
            this.setState(jump);
        } else if (this.state.velocity.x !== 0) {
            if (this.currentState === walk) return;
            this.setState(walk);
        } else if (this.shooting) {
            if (this.currentState === shoot) return;
            this.setState(shoot);
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
        if (this.jumping) return;
        console.log(collisionTileCheck(this, this.backgroundTile, direction));
        if (collisionTileCheck(this, this.backgroundTile, direction)) return;

        const {duration, moveY, ease} = this.config.upDown;
        await gsap.to(this, {
            duration,
            y: `-=${moveY * direction}`,
            ease,
        });

    }

    async dash() {
        if (this.state.velocity.x === 0) return;
        this.dashing = true;

        this.decelerationTween?.progress(1);

        this.state.velocity.x =
            this.config.speed *
            this.config.dash.speedMultiplier *
            this.getDirection();
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

    async shoot() {
        if (this.jumping || this.dashing) return;

        const {duration, ease} = this.config.shoot;
        this.state.velocity.x = 0;
        this.shooting = true;

        await gsap.to(this, {
            duration,
            ease,
        });
        this.shooting = false;
        // console.log("======shoot");
    }

    async dashShoot() {
        if (this.state.velocity.x === 0) return;
        // console.log("=========> dashShoot");
        this.dashShooting = true;
        const {duration, ease} = this.config.shoot;
        await gsap.to(this, {
            duration,
            ease,
        });
        this.dashShooting = false;

    }
}
