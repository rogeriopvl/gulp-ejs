'use strict';

var es = require('event-stream');
var gutil = require('gulp-util');
var ejs = require('ejs');

module.exports = function (options) {
    return es.map(function (file, cb) {
        try {
            file.contents = new Buffer(ejs.render(file.contents.toString(), options));
            file.path = gutil.replaceExtension(file.path, '.html');
            cb(null, file);
        } catch (err) {
            return cb(new Error('gulp-ejs: ' + err));
        }
    });
};
