export type Backgrounds = {
    layers: string[];
    bg: string[];
    panSpeed: number;
};

export const Config = {
    width: 384,
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
                'bg-wall',
                'bg-wall',
                'bg-wall-with-supports',
                'bg-wall',
                'bg-wall',
                'bg-wall',
                'bg-wall-with-supports',
            ],
            layers: [
                'foreground',
            ],
            tile: [
                'floor',
            ],
            panSpeed: 0.01,
        }
    }
};
