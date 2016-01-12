'use strict';

var chai = require('chai'),
  should = chai.should(),
  expect = chai.expect,
  assert = chai.assert,
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
      var object = JSON.parse(changedFile);

      expect(_.keys(object)).to.deep.equal(['_Prerit', 'Andrew A', 'Andrew M', 'Chester', 'Ed', 'Ron']);

      expect(changedFile.indexOf('_Prerit')).to.equal(2);
      expect(changedFile.indexOf('Andrew A')).to.equal(17);
      expect(changedFile.indexOf('Andrew M')).to.equal(49);
      expect(changedFile.indexOf('Chester')).to.equal(65);
      expect(changedFile.indexOf('Matt')).to.equal(79);
      expect(changedFile.indexOf('Mario')).to.equal(95);
      expect(changedFile.indexOf('Sacha')).to.equal(112);
      expect(changedFile.indexOf('Ed')).to.equal(130);
      expect(changedFile.indexOf('Ron')).to.equal(140);

      cb();

    });

    stream.write(getFile('./test/fixtures/file1.json'));

  });

  it('should recursively sort the json file and rename properties', function (cb) {

    var stream = jsonSorter({
      toCamelCase: true
    });

    stream.on('data', function (file) {

      var changedFile = file.contents.toString('utf8');
      var object = JSON.parse(changedFile);

      expect(_.keys(object)).to.deep.equal(['andrewA', 'andrewM', 'chester', 'ed', 'prerit', 'ron']);
      expect(object.chester).to.deep.equal('{"mario":"{}","matt":"{}","sacha":"{}"}');

      expect(changedFile.indexOf('andrewA')).to.equal(2);
      expect(changedFile.indexOf('billy')).to.equal(15);
      expect(changedFile.indexOf('andrewM')).to.equal(33);
      expect(changedFile.indexOf('chester')).to.equal(48);
      expect(changedFile.indexOf('mario')).to.equal(61);
      expect(changedFile.indexOf('matt')).to.equal(78);
      expect(changedFile.indexOf('sacha')).to.equal(94);
      expect(changedFile.indexOf('ed')).to.equal(112);
      expect(changedFile.indexOf('prerit')).to.equal(122);
      expect(changedFile.indexOf('ron')).to.equal(136);

      cb();

    });

    stream.write(getFile('./test/fixtures/file1.json'));

  });

  it('should recursively sort the json file and convert all properties to camel case', function (cb) {

    var stream = jsonSorter({
      toCamelCase: true
    });

    stream.on('data', function (file) {

      var changedFile = file.contents.toString('utf8');
      var object = JSON.parse(changedFile);

      expect(object).to.not.have.property('b-m-w');
      expect(object).to.not.have.property('this-is-kabob-case');
      expect(object).to.not.have.property('this_is_snake_case');

      expect(object).to.have.property('bMW');
      expect(object).to.have.property('bugati');
      expect(object).to.have.property('ferrari');
      expect(object).to.have.property('jeep');
      expect(object.jeep).to.deep.equal('{"grandCherokee":"{}"}');
      expect(object).to.have.property('mazda');
      expect(object).to.have.property('mercedes');
      expect(object).to.have.property('thisIsKabobCase');
      expect(object).to.have.property('thisIsSnakeCase');

      expect(_.keys(object)).to.deep.equal(['bMW', 'bugati', 'ferrari', 'jeep', 'mazda', 'mercedes', 'thisIsKabobCase', 'thisIsSnakeCase', 'toyota']);

      expect(changedFile.indexOf('bMW')).to.equal(2);
      expect(changedFile.indexOf('501')).to.equal(11);
      expect(changedFile.indexOf('x5')).to.equal(26);
      expect(changedFile.indexOf('bugati')).to.equal(41);
      expect(changedFile.indexOf('ferrari')).to.equal(55);
      expect(changedFile.indexOf('jeep')).to.equal(70);
      expect(changedFile.indexOf('grandCherokee')).to.equal(80);
      expect(changedFile.indexOf('mercedes')).to.equal(119);
      expect(changedFile.indexOf('thisIsKabobCase')).to.equal(135);
      expect(changedFile.indexOf('thisIsSnakeCase')).to.equal(158);

      cb();

    });

    stream.write(getFile('./test/fixtures/file2.json'));

  });

});
