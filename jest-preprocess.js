const babelOptions = {
  presets: [
    [
      'babel-preset-gatsby',
      {
        targets: {
          browsers: ['>0.25%', 'not dead'],
        },
      },
    ],
    '@babel/preset-react',
  ],
}

module.exports = require('babel-jest').createTransformer(babelOptions)
