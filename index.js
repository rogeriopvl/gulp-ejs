'use strict'

var through = require('through2')
var PluginError = require('plugin-error')
var replaceExtension = require('replace-ext')
var ejs = require('ejs')

var gulpEjs = function(data, options, settings) {
  data = data || {}
  options = options || {}
  settings = settings || {}

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file)
      return cb()
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-ejs', 'Streaming not supported'))
    }

    var fileData = Object.assign({}, data, file.data)
    options.filename = file.path

    try {
      file.contents = Buffer.from(
        ejs.render(file.contents.toString(), fileData, options)
      )

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
