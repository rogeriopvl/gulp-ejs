'use strict';

var es = require('event-stream');
var gutil = require('gulp-util');
var ejs = require('ejs');

module.exports = function (options, settings) {
    settings = settings || {};
    options = options || {};
    settings.ext = settings.ext || '.html';

    return es.map(function (file, cb) {
        try {
            options.filename = options.filename || file.path;
            file.contents = new Buffer(ejs.render(file.contents.toString(), options));
            file.path = gutil.replaceExtension(file.path, settings.ext);
        } catch (err) {
            return cb(new gutil.PluginError('gulp-ejs', err));
        }
        cb(null, file);
    });
};
