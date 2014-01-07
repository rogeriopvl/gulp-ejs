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

## API

### ejs(options)

#### options
Type: `hash`
Default: `{}`

A hash object where each key corresponds to a variable in your template. Also you can set ejs options in this hash.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-ejs
[npm-image]: https://badge.fury.io/js/gulp-ejs.png

[travis-url]: http://travis-ci.org/rogeriopvl/gulp-ejs
[travis-image]: https://secure.travis-ci.org/rogeriopvl/gulp-ejs.png?branch=master

[depstat-url]: https://david-dm.org/rogeriopvl/gulp-ejs
[depstat-image]: https://david-dm.org/rogeriopvl/gulp-ejs.png
