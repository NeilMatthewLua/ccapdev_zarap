const path = require('path'); 

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '/users': {
                target: 'http://localhost:9090'
            },
            '/pictures': {
                target: 'http://localhost:9090'
            },
            '/reviews': {
                target: 'http://localhost:9090'
            },
            '/restaurants': {
                target: 'http://localhost:9090'
            }
        }
    }
}