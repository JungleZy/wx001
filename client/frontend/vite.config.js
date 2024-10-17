import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
		// 项目插件
		plugins: [
			vue(),
			topLevelAwait(),
			Components({
				resolvers: [
					AntDesignVueResolver({
						importStyle: false // css in js
					})
				]
			}),
			viteCompression({
				verbose: true,
				disable: false,
				threshold: 1025,
				algorithm: 'gzip',
				ext: '.gz'
			})
		],
		// 基础配置
		base: './',
		publicDir: 'public',
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			},
		},
		headers: {
			'Cross-Origin-Opener-Policy': 'cross-origin',
			'Cross-Origin-Embedder-Policy': 'require-corp'
		},
	css: {
		preprocessorOptions: {
			less: {
				modifyVars: {},
				javascriptEnabled: true
			}
		}
	},
		build: {
			outDir: 'dist',
			assetsDir: 'assets',
			assetsInlineLimit: 4096,
			cssCodeSplit: true,
			brotliSize: false,
			sourcemap: false,
			minify: 'terser',
			terserOptions: {
				compress: {
					// 生产环境去除console及debug
					drop_console: false,
					drop_debugger: true,
				},
			},
		},
	}
)


