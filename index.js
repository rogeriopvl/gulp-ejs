'use strict'

var through = require('through2')
var PluginError = require('plugin-error')
var replaceExtension = require('replace-ext')
var ejs = require('ejs')
var Buffer = require('safe-buffer').Buffer

var gulpEjs = function (data, options, settings) {
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
        new PluginError('gulp-ejs', 'Streaming not supported')
      )
    }

    data = Object.assign({}, data, file.data)
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
          'if(typeof window.templates === \'undefined\') window.templates = {}; ' +
          'window.templates[\'' + name + '\'] = ' + template.toString().replace(/function anonymous\(/, 'function(')
        )
      } else {
        file.contents = new Buffer(
          ejs.render(file.contents.toString(), data, options)
        )
      }

      if (typeof settings.ext !== 'undefined') {
        file.path = replaceExtension(file.path, settings.ext)
      }
    } catch (err) {
      this.emit('error', new PluginError('gulp-ejs', err.toString()))
    }

    this.push(file)
    cb()
  })
}

gulpEjs.ejs = ejs

module.exports = gulpEjs
