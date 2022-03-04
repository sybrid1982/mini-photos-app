module.exports = {
    outputDir: '../MiniBackend/wwwroot/dist',
    lintOnSave: true,
    productionSourceMap: false,
    filenameHashing: false,
    css: {
        extract: {
            filename: '[name].css'
        }
    },
    configureWebpack: {
        optimization: {
            splitChunks: false
        },
        output: {
            filename: '[name].js'
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        }
    },
}