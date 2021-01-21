 
module.exports = {
  // entry: set by the plugin
  // output: set by the plugin
  target: 'node',
  externals: {
    'aws-sdk': 'aws-sdk', // Available on AWS Lambda
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { node: '10.19' }, // Node version on AWS Lambda
                useBuiltIns: 'entry',
                modules: false,
                loose: true,
              },
            ],
          ],
        },
      },
    ],
  },
};
