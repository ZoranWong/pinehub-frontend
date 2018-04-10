module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // mutate config for production..
            process.env.API_SERVER_HOST = '';
        } else {
            // mutate for development...
            process.env.API_SERVER_HOST = '';
        }
    }
};