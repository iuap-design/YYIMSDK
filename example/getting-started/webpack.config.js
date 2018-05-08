const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const publicPath = path.resolve(__dirname, 'public')

// env 可以配置全局环境变量
module.exports = function(env) {
    return {
        mode: "development",
        entry: './src/index.js',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './public',
            publicPath: "/"
        },
        plugins: [
            new CleanWebpackPlugin(['public']),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html'
            }),
            new CopyWebpackPlugin([
                { from: 'src/css', to: './css' },
                { from: 'src/imgs', to: './imgs' },
                { from: 'src/lib', to: './lib' }
            ])
        ],
        output: {
            filename: '[name].bundle.js',
            path: publicPath
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: 'babel-loader'
                }
            ]
        }
    }
}
