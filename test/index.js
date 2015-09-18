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

describe('json sorter', function () {

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

      assert.equal(changedFile.indexOf('_Prerit'), 2, '');
      assert.equal(changedFile.indexOf('Andrew A'), 17, '');
      assert.equal(changedFile.indexOf('Andrew M'), 49, '');
      assert.equal(changedFile.indexOf('Chester'), 65, '');
      assert.equal(changedFile.indexOf('Mario'), 95, '');
      assert.equal(changedFile.indexOf('Matt'), 79, '');
      assert.equal(changedFile.indexOf('Sacha'), 112, '');
      assert.equal(changedFile.indexOf('Ed'), 130, '');
      assert.equal(changedFile.indexOf('Ron'), 140, '');

      cb();

    });

    stream.write(getFile('./test/fixtures/file.json'));

  });

  it('should recursively sort the json file and rename properties', function (cb) {

    var stream = jsonSorter({
      rename: true
    });

    stream.on('data', function (file) {

      var changedFile = file.contents.toString('utf8');

      assert.equal(changedFile.indexOf('Andrew A'), 2, '');
      assert.equal(changedFile.indexOf('Andrew M'), 34, '');
      assert.equal(changedFile.indexOf('Chester'), 50, '');
      assert.equal(changedFile.indexOf('Mario'), 63, '');
      assert.equal(changedFile.indexOf('Matt'), 80, '');
      assert.equal(changedFile.indexOf('Sacha'), 96, '');
      assert.equal(changedFile.indexOf('Ed'), 114, '');
      assert.equal(changedFile.indexOf('Prerit'), 124, '');
      assert.equal(changedFile.indexOf('Ron'), 138, '');

      cb();

    });

    stream.write(getFile('./test/fixtures/file.json'));

  });

});
