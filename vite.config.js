import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";
import fastGlob from 'fast-glob';
import { resolve } from 'path'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
const isProduction = process.env.NODE_ENV === 'production';
const manifest = require('./public/webmanifest.json');
const excludeWorkDirs = ['act2','jong']; //번들링 제외

export default ({ command, mode }) => {
    const inputFiles = [
        ...fastGlob.sync('src/**/index.html').filter(file => {
            const isMatch = excludeWorkDirs.some(dir => file.includes(dir));
            return !isMatch;
        }).map(file => path.resolve(__dirname, file))
    ]

    const newMap = {}
        inputFiles.forEach(item=>{
        const regex = /\/src\/([^\/]+)/;
        const match = item.match(regex);
        newMap[match[1]]= item
    })
    console.log('aaaa', newMap)
    return defineConfig({
        root: path.join(__dirname, "./src"),
        base: '/', // Public Base Path
        // publicDir: path.resolve(__dirname, "./public"),
        server: {
            port: 3100,
        },
        preview: {
            port: 4100,
        },
        plugins: [
            vanillaExtractPlugin({
                    identifiers: ({filePath, hash, packageName, debugId}) => `jongjin_${hash}`
            }),
            // VitePWA({
            //     registerType: 'autoUpdate',
            //     devOptions: {
            //         enabled: true,
            //     },
            //     includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
            //     manifest: manifest,
            //     workbox: {
            //         // Workbox options for more control over caching, precaching, etc.
            //         clientsClaim: true,
            //         skipWaiting: true
            //     },
            // }),
        ],
        build: {
            emptyOutDir: true,
            outDir: path.join(__dirname, '/build'),
            rollupOptions: {
                input: newMap,
                output: (()=>{
                    return {
                        chunkFileNames: "assets/[name].[hash].js",
                        entryFileNames: "assets/[name].[hash].js",
                        // entryFileNames: ({ facadeModuleId }) => {
                        //     const filePath = facadeModuleId.replace(__dirname, '');
                        //     const relativeDir = path.dirname(filePath).replace(/\\/g, '/').replace('/src/', '').replace('/', '');
                        //     return `${relativeDir}/assets/[name].[hash].js`;
                        // },
                        // assetFileNames: ( {name}) => {
                        //         const relativeDir = name.split('.')[0];
                        //         return `assets/[name][hash][extname]`
                        // },
                        // manualChunks(id, { getModuleInfo, getModuleIds }) {
                        //     //모든 모듈 ID 출력
                        //     // for (const moduleId of getModuleIds()) {
                        //     //     const moduleInfo = getModuleInfo(moduleId);
                        //     //     console.log('Module ID:', moduleId);
                        //     //     console.log('Module Info:', moduleInfo);
                        //     // }
                        //     const regex = /src\/(.*?)\/style/;
                        //     const match = id.match(regex);
                        //     // const regex = /\/src\/([^\/]+)/;
                        //     // const match = id.match(regex);
                        //     if(match && id.includes(match[1])) return match[1]
                        // },
                    }
                })(),
            }
        }
    })
};
