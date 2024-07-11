export interface Backgrounds {
    layers: Layers[];
    bg: string[];
    tile: string[];
    panSpeed: number;
}

type Layers = {
    name: string;
    scale: number;
    x: number;
    y: number;
}


export const Config = {
    width: 382,
    height: 240,

    backgrounds: {
        buildings: {
            bg: [
                'skyline-a',
                'skyline-b',
                'skyline-a',
            ],
            layers: [
                {
                    name: 'buildings-bg',
                    scale: 1,
                    x: 10,
                    y: 200,
                },
                {
                    name: 'near-buildings-bg',
                    scale: 1,
                    x: 300,
                    y: 200,
                },
            ],
            tile: [
                'floor',
            ],
            panSpeed: 0.2,
        },
        walls: {
            bg: [
                'bg-wall',
                // 'bg-wall-with-supports',
            ],
            layers: [
                {
                    name: 'foreground',
                    scale: 1,
                    x: 500,
                    y: 0,
                },
                {
                    name: 'bg-wall-with-supports',
                    scale: 1,
                    x: 200,
                    y: 0,
                },
            ],
            tile: [
                'floor',
            ],
            panSpeed: 0.01,
        }
    }
};
