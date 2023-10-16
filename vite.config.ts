import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// https://stackoverflow.com/questions/66389043/how-can-i-use-vite-env-variables-in-vite-config-js

export default ({mode}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: process.env.VITE_SERVER_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        }
    });
}