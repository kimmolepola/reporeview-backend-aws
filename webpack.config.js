const path = require('path');
 
module.exports = {
  target: "node", // Or "async-node"
  mode: "production",
  externals: {
    'aws-sdk': 'aws-sdk', // Available on AWS Lambda
  },
  entry: path.resolve(__dirname, './index.js'),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
}
