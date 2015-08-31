'use strict';

var should = require('chai').should(),
  expect = require('chai').expect,
  assert = require('chai').assert,
  through = require('through2'),
  path = require('path'),
  gutil = require('gulp-util'),
  _ = require('underscore-node'),
  fs = require('fs'),
  jsonSorter = require('../index');

describe('version bumper', function () {

  var getFile = function (filePath) {
    return new gutil.File({
      path: filePath,
      cwd: __dirname,
      base: path.dirname(filePath),
      contents: fs.readFileSync(filePath)
    });
  };

  it('should be defined', function () {

    assert.isDefined(jsonSorter, 'jsonSorter is defined');

  });

  it('should recursively sort the json file', function (cb) {

    var stream = jsonSorter();

    stream.on('data', function (file) {

      var changedFile = file.contents.toString('utf8');

      var jsonFile = JSON.stringify(changedFile);
      var jsonParsed = JSON.parse(jsonFile);

      console.log('jsonFile', jsonFile);
      console.log('jsonParsed', jsonParsed);

      cb();

    });

    stream.write(getFile('./test/fixtures/file.json'));

  });

  // it('should bump up version to 0.0.2 for a css file', function (cb) {
  //
  //   var stream = jsonSorter({
  //     version: '0.0.2'
  //   });
  //
  //   stream.on('data', function (file) {
  //
  //     var changedFile = file.contents.toString('utf8');
  //
  //     assert.notInclude(changedFile, '0.0.1', 'version has been changed to 0.0.2');
  //     assert.include(changedFile, '0.0.2', 'version has been changed to 0.0.2');
  //
  //     cb();
  //
  //   });
  //
  //   stream.write(getFile('./test/fixtures/in/file.css'));
  //
  // });

});
