export type Backgrounds = {
    layers: string[];
    bg: string[];
    panSpeed: number;
};

export const Config = {
    width: 600,
    height: 480,

    backgrounds: {
        buildings: {
            bg: [
                'skyline-a',
                'skyline-b',
            ],
            layers: [
                'buildings-bg',
                'near-buildings-bg',
            ],
            tile: [
            ],
            panSpeed: 0.2,
        },
        walls: {
            bg: [
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
