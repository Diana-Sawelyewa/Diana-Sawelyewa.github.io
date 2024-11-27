'use strict';

let path = require('path');

module.exports = {
  mode: 'production', //изменить потом на продакшн
  entry: './src/js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public/js'
  },
  watch: true,

  /* devtool: "source-map", */

  module: {}
};
