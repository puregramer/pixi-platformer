import { Container } from 'pixi.js';


export type EnemyOptions = {
    name: string;
    respawnDelay: number;
    x: number,
    y: number,
}

export default class Enemy extends Container{
    enemiesOptions: EnemyOptions[];
    enemies = new Map<string, any>;

    constructor(enemies : EnemyOptions[]) {
        super();
        this.enemiesOptions = enemies;

        this.append();
    }

    append() {
        this.enemiesOptions.forEach((enemy, idx) => {
            // this.enemies.set(enemy.name, )

        });
    }

}