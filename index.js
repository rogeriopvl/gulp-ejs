'use strict'

const through = require('through2')
const PluginError = require('plugin-error')
const ejs = require('ejs')

const PLUGIN_NAME = 'gulp-ejs'

function render(data, options = {}) {
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file)
    }

    if (file.isStream()) {
      callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
    }

    options.filename = file.path

    const ejsData = Object.assign({}, data, file.data)

    try {
      file.contents = Buffer.from(
        ejs.render(file.contents.toString(), ejsData, options)
      )

      this.push(file)
    } catch (err) {
      this.emit('error', new PluginError(PLUGIN_NAME, err, { fileName: file.path }))
    }

    callback()
  })
}

render.ejs = ejs

module.exports = render
