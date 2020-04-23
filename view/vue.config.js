const path = require('path'); 

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '/users': {
                target: 'http://localhost:9090',
                changeOrigin: true
            },
            '/pictures': {
                target: 'http://localhost:9090',
                changeOrigin: true
            },
            '/reviews': {
                target: 'http://localhost:9090',
                changeOrigin: true
            },
            '/restaurants': {
                target: 'http://localhost:9090',
                changeOrigin: true
            }
        }
    }
}