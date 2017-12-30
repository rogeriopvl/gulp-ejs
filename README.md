# gulp-ejs [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/rogeriopvl/gulp-ejs.svg)](https://greenkeeper.io/)

> ejs plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-ejs` as a development dependency:

```shell
npm install --save-dev gulp-ejs
```

Then, add it to your `gulpfile.js`:

```javascript
var ejs = require("gulp-ejs")

gulp.src("./templates/*.ejs")
	.pipe(ejs({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./dist"))
```
If you want to use `gulp-ejs` in a watch/livereload task, you may want to avoid gulp exiting on error when, for instance, a partial file is `ENOENT`.
Here's an example on how to make it work:

```javascript
var ejs = require('gulp-ejs')
var log = require('fancy-log')

gulp.src('./templates/*.ejs')
	.pipe(ejs({
		msg: 'Hello Gulp!'
	}).on('error', log))
	.pipe(gulp.dest('./dist'))
```
This will make gulp log the error and continue normal execution.

If you want to specify the extension of output files, set the ext option:

```javascript
var ejs = require('gulp-ejs')

gulp.src('./templates/*.ejs')
	.pipe(ejs({ msg: 'Hello Gulp!'}, {}, { ext: '.html' }))
	.pipe(gulp.dest('./dist'))
```

### Acessing the ejs object

The ejs object is also exported and you can use it to configure ejs:

```javascript
var gulpEjs = require('gulp-ejs')

gulpEjs.ejs.fileLoader = function () { /* custom file loader */ }
```

## API

### ejs(data, options, settings)

#### data
Type: `hash`
Default: `{}`

A hash object where each key corresponds to a variable in your template.

**Note:** As of `v1.2.0`, `file.data` is supported as a way of passing data into ejs. See [this](https://github.com/colynb/gulp-data#note-to-gulp-plugin-authors). If both `file.data` and `data` are passed, they are merged (`data` works as default for ejs options and `file.data` overrides it.)

#### options
Type: `hash`
Default: `{}`

A hash object for ejs options.

For more info on `ejs` options, check the [project's documentation](https://github.com/mde/ejs).

#### settings
Type: `hash`
Default: `{}`

A hash object to configure the plugin.

##### settings.ext
Type: `String`
Default: `undefined`

Defines the file extension that will be appended to the filename. If no extension is provided, the same extension of the input file will be used.

**Note:** As of `v2.0.0` the output file extension is no longer `.html` by default, you need to specify it, otherwise it will have the same extension of the input file.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-ejs
[npm-image]: https://badge.fury.io/js/gulp-ejs.png

[travis-url]: http://travis-ci.org/rogeriopvl/gulp-ejs
[travis-image]: https://secure.travis-ci.org/rogeriopvl/gulp-ejs.png?branch=master

[depstat-url]: https://david-dm.org/rogeriopvl/gulp-ejs
[depstat-image]: https://david-dm.org/rogeriopvl/gulp-ejs.png
