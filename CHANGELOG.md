# Changelog

## v5.0.0
- Update ejs to `v3.0.1` (please read [ejs's changelog](https://github.com/mde/ejs/blob/master/CHANGELOG.md) for more info on discontinued ejs features)

## v4.1.2

- Update ejs to `v2.7.1`

## v4.1.1

- Update ejs to `v2.6.2`

## v4.1.0

- Add support for the new ejs ([v.2.5.8](https://github.com/mde/ejs/releases/tag/v2.5.8)) async rendering feature. (@Tietew)

## v4.0.0

This version features a complete rewrite of the plugin to update it's code to modern es6 javascript, which involve some breaking changes.

- Removed settings hash (third argument), consequentially `settings.ext` (setting output file extension) is no longer supported. If you need to rename the ejs files extension please use [gulp-rename](https://npmjs.com/package/gulp-rename).
- Renamed exposed `ejs` object to `__EJS__`

Please check the [README](https://github.com/rogeriopvl/gulp-ejs/blob/master/README.md) file for more info on how  migrate to version 4.

## Previous versions

Please check [The github releases page](https://github.com/rogeriopvl/gulp-ejs/releases) for previous versions changelog.
