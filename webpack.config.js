const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: [
            'babel-plugin-transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      }
    ],
  }
}
