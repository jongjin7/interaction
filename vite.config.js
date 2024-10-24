import {defineConfig} from 'vite';
import fs from 'fs';
import path from 'node:path';
import fastGlob from 'fast-glob';
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin';
import tailwindcss from 'tailwindcss';

const isProduction = process.env.NODE_ENV === 'production';
const manifest = require('./public/webmanifest.json');
const excludeWorkDirs = ['pin-gallery-next']; //번들링 제외

export default ({command, mode}) => {
    const tempDirArr = [
        ...fastGlob.sync('src/**/index.html').filter(file => {
            const isMatch = excludeWorkDirs.some(dir => file.includes(dir));
            return !isMatch;
        }).map(file => path.resolve(__dirname, file))
    ];

    const useDirArr = {};
    tempDirArr.forEach(item => {
        const regex = /\/src\/([^\/]+)/;
        const match = item.match(regex);
        useDirArr[match[1]] = item;
    });
    return defineConfig({
        root: path.join(__dirname, './src'),
        base: '/', // Public Base Path
        publicDir: path.resolve(__dirname, './public'),
        server: {
            // https: {
            //     key: fs.readFileSync('localhost-key.pem'),
            //     cert: fs.readFileSync('localhost.pem'),
            // },
            watch: {
              ignored: [
                // 무시하고 싶은 폴더 경로를 지정합니다.
                ...excludeWorkDirs.map(item => `src/${item}/**`),
              ]
            },
            port: 3900
        },
        preview: {
            port: 4900
        },
        css: {
            devSourcemap: true
        },
        resolve: {
            alias: [
                {
                    find: "@",
                    replacement: path.resolve(__dirname, "src/"),
                },
            ]
        },
        plugins: [
            tailwindcss(),
            vanillaExtractPlugin({
                identifiers: ({filePath, hash, packageName, debugId}) => `jjlim_2024-${hash}`
            })
        ],
        build: {
            Sourcemap: true,
            emptyOutDir: true,
            outDir: path.join(__dirname, '/build'),
            rollupOptions: {
                input: useDirArr,
                output: (() => {
                    return {
                        chunkFileNames: 'assets/[name].[hash].js',
                        entryFileNames: 'assets/[name].[hash].js'
                    };
                })()
            }
        }
    });
};
