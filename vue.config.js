const path = require('path');
const fs = require('fs');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, dir)
}

function FrontEnvConfigSettingPlug () {
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
    fs.readFile(envConfigPath, 'utf8', function (error, config) {
        if (error) {
            //console.log('set front env config fail', error);
        } else {
            fs.writeFile(configPath, config, function () {
            });
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
        config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
            bypassOnDebug: true
        }).end();
        config.externals = {
            'vue': 'Vue',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'axios': 'axios'
        };
    },
    configureWebpack: {
        performance: {
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor:{
                        chunks:"all",
                        test: /node_modules/,
                        name:"vendor",
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority:100,
                    },
                    common: {
                        chunks:"all",
                        test:/[\\/]src[\\/]js[\\/]/,
                        name: "common",
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority:60
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sa|sc|c)ss$/,
                        chunks: 'all',
                        enforce: true,
                    },
                    runtimeChunk: {
                        name: 'manifest'
                    }
                }
            }
        },
        plugins: [
            new FrontEnvConfigSettingPlug(),
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.html$|\.json$|\.css/,
                threshold: 0, // 只有大小大于该值的资源会被处理
                minRatio:0.8, // 只有压缩率小于这个值的资源才会被处理
                deleteOriginalAssets: true // 删除原文件
            })
        ]
    }
};
