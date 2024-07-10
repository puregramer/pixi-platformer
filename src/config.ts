export type Backgrounds = {
    layers: string[];
    bg: string[];
    panSpeed: number;
};

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
                'buildings-bg',
                'near-buildings-bg',
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
                'foreground',
                'bg-wall-with-supports',
            ],
            tile: [
                'floor',
            ],
            panSpeed: 0.01,
        }
    }
};
