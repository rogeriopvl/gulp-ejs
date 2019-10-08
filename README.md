# gulp-ejs [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

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

### Watch mode error handling (for gulp v3 or below)

If you want to use `gulp-ejs` in a watch/livereload task, you may want to avoid gulp exiting on error when, for instance, a partial file is `ENOENT` or an ejs syntax error.

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

**Please note that you don't need to do this for Gulp v4.**

### Accessing the ejs object

The ejs object is also exported and you can use it to configure ejs:

```javascript
const ejs = require('gulp-ejs')

ejs.__EJS__.fileLoader = function () { /* custom file loader */ }
```

**Note:** As of version 4, the exported ejs object was renamed from `ejs` to `__EJS__`.

### Async rendering (requires runtime support)

Since ejs [v2.5.8](https://github.com/mde/ejs/releases/tag/v2.5.8) added support for promise/async-await `renderFile`, you can now use this option with gulp-ejs v4.1.0.

You can use async/await in your ejs templates by passing `{ async: true }` in the ejs options hash:

```javascript
const ejs = require('gulp-ejs')

async function foobar() { /* async task */ }

gulp.src('./templates/*.ejs')
	.pipe(ejs({ foobar }, { async: true }))
	.pipe(gulp.dest('./dist'))
```

Then in your templates use `await` to call async functions. Here's an example:

```javascript
<%= await foobar() %>
```

## API

### ejs(data, options)

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

### Renaming file extensions

As of version 4, the third api parameter `settings` was removed. You can no longer provide an extension. This is because it falls out of the scope of `gulp-ejs`. So if you need to save the file with a different extension you can use [gulp-rename](https://npmjs.com/package/gulp-rename).

Here's an example for template files with `.ejs` extension that are rendered into `.html` files:

```javascript
const ejs = require('gulp-ejs')
const rename = require('gulp-rename')

gulp.src('./templates/*.ejs')
  .pipe(ejs({ title: 'gulp-ejs' }))
  .pipe(rename({ extname: '.html' }))
  .pipe(gulp.dest('./dist'))
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-ejs
[npm-image]: https://badge.fury.io/js/gulp-ejs.png

[travis-url]: http://travis-ci.org/rogeriopvl/gulp-ejs
[travis-image]: https://secure.travis-ci.org/rogeriopvl/gulp-ejs.png?branch=master

[depstat-url]: https://david-dm.org/rogeriopvl/gulp-ejs
[depstat-image]: https://david-dm.org/rogeriopvl/gulp-ejs.png
