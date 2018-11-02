const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        pos: './src/pos/pos.ts',
        cpro: './src/cpro/cpro.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devServer: {
        contentBase: 'static',
        historyApiFallback: false, //不跳转
        inline: true, //实时刷新
        hot: false,
        compress: true,
        port: 8086,
        host: '0.0.0.0',
        disableHostCheck: true,
    },
    module: {
        rules: [{
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'pos',
            template: './src/pos/index.html',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, `./src/pos/static`),
            to: `static`,
            ignore: ['.*']
        }])
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                parse: {},
                compress: {},
                mangle: true, // Note `mangle.properties` is `false` by default.
                output: null,
                toplevel: false,
                nameCache: null,
                ie8: true,
                keep_fnames: false,
            }
        })]
    }
}
