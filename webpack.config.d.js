const path = require('path')

module.exports = {
  mode: 'development',
  entry: [
    './src/rendering.js'
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'rendering_bundle.js',
    library: 'rendering',
    libraryTarget: 'umd'
  },
  externals: {
    three: {
      root: 'THREE',
      commonjs: 'three',
      commonjs2: 'three'
    }
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [

  ]
}
