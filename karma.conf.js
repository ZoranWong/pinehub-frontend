// karma.conf.js
module.exports = function(config) {
    config.set({
        //自动launch chrome，需要 chrome 插件
        browsers: ['Chrome'],
        // 使用到的  framework
        frameworks: ['jasmine', 'browserify'],
        basePath: './test',
        // unit test 文件
        files: [
            'UrlGenerator.js'
        ],
        //预处理，转换ES6
        preprocessors: {
            'UrlGenerator.js': [ 'browserify' ]
        },
        //karma-browserify 配置，配置为使用 babelify
        browserify: {
            debug: true,
            transform: [['babelify', {presets: ['es2015'], plugins: ['transform-class-properties']}]]
        },
        //用 karma-jasmine-html-reporter 生成report
        reporters: ['kjhtml']
    })
};