import { defineConfig } from 'vite'
import path from "node:path";
import fastGlob from 'fast-glob';
import { resolve } from 'path'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
const isProduction = process.env.NODE_ENV === 'production';

export default ({ command, mode }) => {
    const inputFiles = [
        path.resolve(__dirname, 'src/index.html'),
        ...fastGlob.sync('src/**/index.html').map(file => path.resolve(__dirname, file)),
    ];

    return defineConfig({
        root: path.join(__dirname, "./src"),
        base: '/', // Public Base Path
        plugins: [
            vanillaExtractPlugin({
                    identifiers: ({filePath, hash, packageName, debugId}) => `${debugId}_jongjin_${hash}`
            })
        ],
        build: {
            emptyOutDir: true,
            outDir: path.join(__dirname, '/build'),
            rollupOptions: {
                input: inputFiles,
                output: (()=>{
                    return {
                        entryFileNames: ({ facadeModuleId }) => {
                            const filePath = facadeModuleId.replace(__dirname, '');
                            const relativeDir = path.dirname(filePath).replace(/\\/g, '/').replace('/src/', '').replace('/', '');
                            return `${relativeDir}/assets/[name].[hash].js`;
                        },
                        //chunkFileNames: 'assets/[name].[hash].js',
                        // assetFileNames: ( assetInfo) => {
                        //     return `assets/[name].[hash][extname]`
                        // },
                        //assetFileNames: ({ name }) => `ccc/assets/${name}`,
                    }
                })(),
            }
        }
    })
};
