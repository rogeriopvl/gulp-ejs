# gulp-ejs [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> ejs plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-ejs` as a development dependency:

```shell
npm install --save-dev gulp-ejs
```

Then, add it to your `gulpfile.js`:

```javascript
var ejs = require("gulp-ejs");

gulp.src("./templates/*.ejs")
	.pipe(ejs({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./dist"));
```
If you want to use `gulp-ejs` in a watch/livereload task, you may want to avoid gulp exiting on error when, for instance, a partial file is `ENOENT`.
Here's an example on how to make it work:

```javascript
var ejs = require('gulp-ejs');
var gutil = require('gulp-util');

gulp.src('./templates/*.ejs')
	.pipe(ejs({
		msg: 'Hello Gulp!'
	}).on('error', gutil.log))
	.pipe(gulp.dest('./dist'));
```
This will make gulp log the error and continue normal execution.

## API

### ejs(options, settings)

#### options
Type: `hash`
Default: `{}`

A hash object where each key corresponds to a variable in your template. Also you can set ejs options in this hash.

For more info on `ejs` options, check the [project's documentation](https://github.com/visionmedia/ejs).

**Note:** As of `v1.2.0`, `file.data` is supported as a way of passing data into ejs. See [this](https://github.com/colynb/gulp-data#note-to-gulp-plugin-authors).

#### settings
Type: `hash`
Default: `{ext: '.html'}`

A hash object to configure the plugin.

##### settings.ext
Type: `String`
Default: `.html`

Defines the default file extension that will be appended to the filename.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-ejs
[npm-image]: https://badge.fury.io/js/gulp-ejs.png

[travis-url]: http://travis-ci.org/rogeriopvl/gulp-ejs
[travis-image]: https://secure.travis-ci.org/rogeriopvl/gulp-ejs.png?branch=master

[depstat-url]: https://david-dm.org/rogeriopvl/gulp-ejs
[depstat-image]: https://david-dm.org/rogeriopvl/gulp-ejs.png
