import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";
import fastGlob from 'fast-glob';
import { resolve } from 'path'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
const isProduction = process.env.NODE_ENV === 'production';
const manifest = require('./public/webmanifest.json');
const excludeWorkDirs = ['act2']; //번들링 제외

export default ({ command, mode }) => {
    const inputFiles = [
        path.resolve(__dirname, 'src/index.html'),
        ...fastGlob.sync('src/**/index.html').filter(file => {
            const isMatch = excludeWorkDirs.some(dir => file.includes(dir));
            return !isMatch;
        }).map(file => path.resolve(__dirname, file))
    ]

    return defineConfig({
        root: path.join(__dirname, "./src"),
        base: '/', // Public Base Path
        publicDir: path.resolve(__dirname, "./public"),
        // server: {
        //     port: 3300,
        // },
        // preview: {
        //     port: 4300,
        // },
        plugins: [
            vanillaExtractPlugin({
                    identifiers: ({filePath, hash, packageName, debugId}) => `jongjin_${hash}`
            }),
            VitePWA({
                registerType: 'autoUpdate',
                devOptions: {
                    enabled: true,
                },
                includeAssets: ['favico n.ico', 'apple-touch-icon.png'],
                manifest: manifest,
                workbox: {
                    // Workbox options for more control over caching, precaching, etc.
                },
            }),
        ],
        build: {
            emptyOutDir: true,
            outDir: path.join(__dirname, '/build'),
            rollupOptions: {
                input: inputFiles,
                output: (()=>{
                    return {
                        //chunkFileNames: "assets/js/[name].js",
                        entryFileNames: ({ facadeModuleId }) => {
                            const filePath = facadeModuleId.replace(__dirname, '');
                            const relativeDir = path.dirname(filePath).replace(/\\/g, '/').replace('/src/', '').replace('/', '');
                            return `${relativeDir}/assets/[name].[hash].js`;
                        },
                        assetFileNames: ( {name}) => {
                            console.log('name', name)
                            const relativeDir = name.split('.')[0];
                            return `${relativeDir}/assets/style.[hash][extname]`
                        },
                        manualChunks(id, { getModuleInfo, getModuleIds }) {
                            // 모든 모듈 ID 출력
                            // for (const moduleId of getModuleIds()) {
                            //     const moduleInfo = getModuleInfo(moduleId);
                            //     console.log('Module ID:', moduleId);
                            //     console.log('Module Info:', moduleInfo);
                            // }
                            const regex = /src\/(.*?)\/style/;
                            const match = id.match(regex);
                            if(match && id.includes(match[1])) return match[1]
                        },
                    }
                })(),
            }
        }
    })
};
