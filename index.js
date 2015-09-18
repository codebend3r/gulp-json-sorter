/**
 * Updated by crivas on 09/18/2015
 * Email: chester.rivas@gmail.com
 * Plugin Name: gulp-json-sorter
 */

'use strict';

var fs = require('fs'),
  through = require('through2'),
  gutil = require('gulp-util'),
  sortObject = require('./lib/sortObject'),
  _ = require('underscore-node');

module.exports = function (options) {

  /**
   * on every file
   * @param file
   * @param enc
   * @param callback
   */
  var bufferedContents = function (file, enc, callback) {

    if (file.isStream()) {

      this.emit('error', new gutil.PluginError('ute-json-sorter', 'Streams are not supported!'));
      callback();

    } else if (file.isNull()) {

      callback(null, file); // Do nothing if no contents

    } else {

      var ctx = file.contents.toString('utf8');
      var jsonData = sortObject(ctx, options);

      file.contents = new Buffer(jsonData);
      callback(null, file);

    }

  };

  /**
   * returns streamed content
   */
  return through.obj(bufferedContents);


};
