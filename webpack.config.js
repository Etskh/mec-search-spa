const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/src/app.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"],
  },
  module: {
    rules: [
      {
        test: { or: [ /.js$/, /.jsx$/ ]},
        include: [
          path.resolve(__dirname, 'client/src')
        ],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
};
