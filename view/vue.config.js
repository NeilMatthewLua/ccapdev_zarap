const path = require('path');

module.exports = {
    devServer: {
        proxy: {
             '/pictures' : {
                 target: ' http://localhost:9090 '
             },
             '/restuarants' : {
                 target: ' http://localhost:9090 '
             },
             '/users' : {
                 target: ' http://localhost:9090 '
             },
             '/reviews' : {
                 target: ' http://localhost:9090 '
             }
        }
    }
}