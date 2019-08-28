/*
 * @desc 静态公共资源打包配置
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        // 定义程序中打包公共文件的入口文件vendor.js
        normal: ['echarts/lib/echarts', 'vue', 'moment','elliptic', 'jquery', 'xterm'],
    },

    output: {
        path: path.resolve(__dirname, '../static', 'dll'),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
        libraryTarget: 'this',
    },

    plugins: [
        new webpack.DllPlugin({
            // 定义程序中打包公共文件的入口文件vendor.js
            context: process.cwd(),

            // manifest.json文件的输出位置
            path: path.resolve(__dirname, '../', '[name]-manifest.json'),

            // 定义打包的公共vendor文件对外暴露的函数名
            name: '[name]_[hash]',
        }),
    ],
};
