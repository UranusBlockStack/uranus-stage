const webpack = require('webpack');
const path = require('path');
// vue-loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
// 使用happypack
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')

module.exports = {
    entry: './src/main.js',
    module: {
        rules: [
            // 处理js
            {
                test: /\.js$/,
                //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
                loader: 'happypack/loader?id=happyBabel',
                //排除node_modules 目录下的文件
                exclude: /node_modules/,
            },
            // 处理vue
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            // 处理字体
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
            },
        ],
    },
    plugins: [
        // 请确保引入这个插件来施展魔法
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
        }),
        new HappyPack({
            //用id来标识 happypack处理类文件
            id: 'happyBabel',
            //如何处理 用法和loader 的配置一样
            loaders: [
                {
                    loader: 'babel-loader?cacheDirectory=true',
                },
            ],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        // 解决vender后面的hash每次都改变
        new webpack.HashedModuleIdsPlugin(),
        // 处理静态文件夹 static 复制到打包的 static 文件夹
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: 'static',
                ignore: ['.*'],
            },
        ]),
        new DllReferencePlugin({
          // jquery 映射到json文件上去
          manifest: require('../normal-manifest.json')
        }),
    ],
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        },
    },
};
