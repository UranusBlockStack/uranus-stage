const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    vendor: ['element-ui', 'jquery']
  },
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'dll.[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../', '[name]-manifest.json'),
      name: '[name]'
    })
  ]
}
