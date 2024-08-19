import { Container, Ticker } from 'pixi.js';
import { BaseEnemy } from './enemy/EggTurret';
import SpritesheetAnimation from './SpritesheetAnimation';
import { AnimState } from './Player';
import { Config } from '../config';
import { collisionCheck } from '../utils/collision';
import { waitFor } from '../utils/asyncUtils';

export default class Effect extends Container {
    private anim: SpritesheetAnimation;
    currentState: AnimState | null = null;
    private isMoveing: boolean = false;

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
        explosion1: {
            anim: 'explosion-1',
            loop: false,
            speed: 0.2,
        },
    };

    config = {
        shot: {
            scale: 0.6,
            speedMultiplier: 0.3,
        },
        shotHit: {
            scale: 0.8,
        },
        explosion1: {
            scale: 0.5,
            // duration: 0.2,
            // ease: 'sine',
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

    async playEffect(effectName: string, direction?: number) {
        this.setState(Effect.animStates[effectName]);
        switch (effectName) {
            case 'shot':
                this.isMoveing = true;
                return await this.animateShot(direction!);

            case 'explosion1':
                return await this.animateExplosion1();

            case 'shotHit':
                this.isMoveing = false;
                return await this.animateShotHit();
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

    async updatePosition(x: number, speed: number) {
        if (this.destroyed || !this.isMoveing) return;
        this.x += x * speed;

        const background = this.parent?.getChildByName('background');
        const enemy = background?.getChildByName('enemy');

        for (let i = 0; i < enemy!.children.length; i++) {
            if (this.destroyed) continue;
            // console.log(`=== collisionCheck ${i}`, collisionCheck(this, enemy!.children[i]));
            if (collisionCheck(this, enemy!.children[i])) {
                console.log('==== destroyed effect');
                await this.playEffect('shotHit');
                // enemy?.children[i].setHurt();
                const target = enemy?.children[i] as BaseEnemy;
                target.setHurt();
                await waitFor(0.2);

                this.destroy();
            }

        }

        if (this.destroyed) return;
        if (Config.width / 2 < Math.abs(this.x - Config.width / 2)) {
            this.destroy();
            console.log('==== destroyed effect !!');
        }
    }

    async animateExplosion1() {
        const { scale } = this.config.explosion1;
        this.scale.set(scale);
    }

    async animateShotHit() {
        const { scale } = this.config.shotHit;
        this.scale.set(scale);
    }

    setState(state: AnimState) {
        // console.log("==== effect state", state);
        this.currentState = state;
        return this.anim.play(state);
    }
}
