import { pixiPipes } from '@assetpack/core/pixi';

export default {
    entry: './raw-assets',
    output: './public/assets/',
    cache: true,
    pipes: [
        ...pixiPipes({
            cacheBust: false,
            // resolutions: { default: 1, low: 0.5 },
            // compression: { jpg: true, png: true, webp: true },
            texturePacker: {
                texturePacker: {
                    removeFileExtension: true,
                    // nameStyle: "short"
                },
            },
            manifest: {
                // createShortcuts: true,
                output: './public/assets/assets-manifest.json',
            }
        }),
    ],
};
