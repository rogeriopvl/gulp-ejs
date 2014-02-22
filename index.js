'use strict';

var es = require('event-stream');
var gutil = require('gulp-util');
var ejs = require('ejs');

var logPrefix = "[" + gutil.colors.blue("ejs") + "]";

var notFoundHandler = function(err, file, settings) {
    var errorMessage = "partial '" + err.path + "' not found";
    gutil.log(logPrefix, gutil.colors.red(errorMessage));
    file.contents = new Buffer(errorMessage); // Output error message into file
    file.path = gutil.replaceExtension(file.path, settings.ext);
    return file;
}

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
            if(err.code === 'ENOENT') {
                // Partial file not found, keep gulp and log error
                return cb(null, notFoundHandler(err, file, settings));
            }
            return cb(new gutil.PluginError('gulp-ejs', err));
        }
        cb(null, file);
    });
};
