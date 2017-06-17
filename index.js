'use strict'

var through = require('through2')
var gutil = require('gulp-util')
var ejs = require('ejs')
var assign = require('object-assign')
var Buffer = require('safe-buffer').Buffer

module.exports = function (data, options, settings) {
  data = data || {}
  options = options || {}
  settings = settings || {}

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file)
      return cb()
    }

    if (file.isStream()) {
      this.emit(
        'error',
        new gutil.PluginError('gulp-ejs', 'Streaming not supported')
      )
    }

    data = assign({}, data, file.data)
    options.filename = file.path

    try {
      if (options.client === true) {
        var name = file.basename.split(/\./)[0].toLowerCase()
        if (typeof settings.name !== 'undefined') {
          if (settings.name instanceof Function) {
            name = settings.name(file)
          } else if (settings.name instanceof String) {
            name = settings.name
          }
        }
        if (typeof settings.suffix !== 'undefined') {
          name += settings.suffix
        }
        var template = ejs.compile(file.contents.toString(), options)
        options.filename = file.basename
        file.contents = new Buffer(
          'if(tyepof window.templates === 'undefined') window.templates = {}; ' +
          'window.templates[\'' + name + '\'] = ' + template.toString().replace(/function anonymous\(/, 'function(')
        )
      } else {
        file.contents = new Buffer(
          ejs.render(file.contents.toString(), data, options)
        )
      }

      if (typeof settings.ext !== 'undefined') {
        file.path = gutil.replaceExtension(file.path, settings.ext)
      }
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-ejs', err.toString()))
    }

    this.push(file)
    cb()
  })
}
