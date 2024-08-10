import { Container } from 'pixi.js';
import { EnemyFactory } from './enemyFactory';

export type EnemyOptions = {
    name: string;
    respawnDelay: number;
    x: number,
    y: number
}

export default class Enemy extends Container{
    enemiesOptions: EnemyOptions[];
    // enemies = new Map<string, any>;
    enemies: any[] = [];

    constructor(enemies : EnemyOptions[]) {
        super();
        this.enemiesOptions = enemies;

        this.append();
    }

    append() {
        this.enemiesOptions.forEach((enemy) => {
            const enemyInstance = new EnemyFactory[enemy.name](enemy);
            this.enemies.push(enemyInstance);

            this.addChild(enemyInstance);

        });
    }

}