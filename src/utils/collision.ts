import { Sprite, TilingSprite } from 'pixi.js';
import { Directions, Player } from '../components/Player';

export function collisionCheck(object1: Sprite, object2: Sprite) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return (
        bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y
    );
}

export function collisionTileCheck(player: Player, tile: TilingSprite, direction: number) {
    // console.log("= collisionTileCheck", player.y, tile.y, tile.height);
    return (
        (player.y < tile.y - (tile.height * 1.1) && direction == Directions.UP) ||
        (player.y > tile.y - (tile.height / 2) && direction == Directions.DOWN)
    );
}