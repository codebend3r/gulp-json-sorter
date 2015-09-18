/**
 * Updated by crivas on 09/18/2015
 * Email: chester.rivas@gmail.com
 * Plugin Name: gulp-json-sorter
 */

'use strict';

var _ = require('underscore-node');

/**
 * sorts json alphabetically and returns the modified object
 * @param object
 * @param options
 * @returns {object}
 */
var sortObject = function (object, options) {

  var sortedObj = {},
    parsedObject = JSON.parse(object),
    cleanedObject = {},
    keys;

  if (!_.isUndefined(options) && !_.isUndefined(options.rename)) {
    _.each(parsedObject, function (prop, key) {
      var cleanKey = key.replace(/^_/, '').replace(/_/g, '-');
      cleanedObject[cleanKey] = prop;
    });
    parsedObject = cleanedObject;
  }

  keys = _.sortBy(_.keys(parsedObject), function (key) {
    return key.toLowerCase();
  });

  _.each(keys, function (key) {

    if (sortedObj[key]) {
      console.log('key', key, 'already exists and will be overwritten');
    }

    if (typeof parsedObject[key] === 'object') {
      sortedObj[key] = sortObject(JSON.stringify(parsedObject[key]), options);
    } else {
      sortedObj[key] = parsedObject[key];
    }

  });

  return JSON.stringify(sortedObj);

};

module.exports = sortObject;
