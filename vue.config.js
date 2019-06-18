const path = require('path');
const fs = require('fs');

function resolve(dir) {
    return path.join(__dirname, dir)
}

function FrontEnvConfigSettingPlug() {
    let configPath = path.join(__dirname, "/src/env.js");
    let envConfigPath = "";
    if (process.env.NODE_ENV === "production") {
        envConfigPath = path.join(__dirname, '/environment/production.js');
    } else if (process.env.NODE_ENV === 'development') {
        envConfigPath = path.join(__dirname, '/environment/development.js');
    } else if (process.env.NODE_ENV === 'staging') {
        envConfigPath = path.join(__dirname, '/environment/staging.js');
    }
    console.log(envConfigPath);
    fs.readFile(envConfigPath, 'utf8', function(error, config) {
        if (error) {
            //console.log('set front env config fail', error);
        } else {
            fs.writeFile(configPath, config, function() { });
        }
    });
}

FrontEnvConfigSettingPlug.prototype.apply = compler => {

}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('bower', resolve('bower_components'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('static', resolve('static'));
    },
    configureWebpack: {
        performance: {
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        optimization: {
            splitChunks: {
              chunks: 'async',
              minSize: 30000,
              maxSize: 0,
              minChunks: 1,
              maxAsyncRequests: 5,
              maxInitialRequests: 3,
              automaticNameDelimiter: '~',
              name: true,
              cacheGroups: {
                vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  priority: -10
                },
                default: {
                  minChunks: 2,
                  priority: -20,
                  reuseExistingChunk: true
                }
              }
            }
        },
        plugins: [
            new FrontEnvConfigSettingPlug()
        ]
    }
};
