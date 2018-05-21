var webpack = require('webpack')

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)|(lib)/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        // // new webpack.BannerPlugin({
        // //     banner: `
        // //         description:  IM SDK Web
        // //         author: Yonyou FED Team
        // //         date: 2018-05-21
        // //         version: V1.1.0
        // //         file: [file]
        // //     `
        // //   }),
        //   new webpack.BannerPlugin({
        //     banner: " name:[name], author: \"Yonyou FED Team\", file:[file]"
        //   })
    ]
}