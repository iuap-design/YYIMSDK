module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)|(lib)/,
                use: 'babel-loader'
            }
        ]
      }
}