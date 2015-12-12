/*global describe, it*/
'use strict';

var fs = require('fs'),
should = require('should'),
path = require('path');
require('mocha');

var gutil = require('gulp-util'),
ejs = require('../');

describe('gulp-ejs', function () {

    var expectedFile = new gutil.File({
        path: 'test/expected/output.html',
        cwd: 'test/',
        base: 'test/expected',
        contents: fs.readFileSync('test/expected/output.html')
    });

    var expectedFileWithPartial = new gutil.File({
        path: 'test/expected/outputWithPartial.html',
        cwd: 'test/',
        base: 'test/expected',
        contents: fs.readFileSync('test/expected/outputWithPartial.html')
    });

    it('should produce correct html output when rendering a file', function (done) {

        var srcFile = new gutil.File({
            path: 'test/fixtures/ok.ejs',
            cwd: 'test/',
            base: 'test/fixtures',
            contents: fs.readFileSync('test/fixtures/ok.ejs')
        });

        var stream = ejs({ title: 'gulp-ejs' });

        stream.on('error', function (err) {
            should.exist(err);
            done(err);
        });

        stream.on('data', function (newFile) {

            should.exist(newFile);
            should.exist(newFile.contents);

            String(newFile.contents).should.equal(String(expectedFile.contents));
            done();
        });

        stream.write(srcFile);
        String(path.extname(srcFile.path)).should.equal('.html');

      stream.end();
    });

    it('should throw error when syntax is incorrect', function (done) {

        var srcFile = new gutil.File({
            path: 'test/fixtures/nok.ejs',
            cwd: 'test/',
            base: 'test/fixtures',
            contents: fs.readFileSync('test/fixtures/nok.ejs')
        });

        var stream = ejs({ title: 'gulp-ejs' });

        stream.on('error', function (err) {
            should.exist(err);
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

  it('should produce correct html output with a specific file extension', function (done) {

    var srcFile = new gutil.File({
      path: 'test/fixtures/ok.ejs',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/ok.ejs')
    });

    var stream = ejs({ title: 'gulp-ejs' }, {ext:'.txt'});

    stream.on('error', function (err) {
      should.exist(err);
      done(err);
    });

    stream.on('data', function (newFile) {

      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(String(expectedFile.contents));
      done();
    });

    stream.write(srcFile);
    String(path.extname(srcFile.path)).should.equal('.txt');

    stream.end();
  });

  it('should produce correct html output using partial', function (done) {

    var srcFile = new gutil.File({
      path: 'test/fixtures/withpartial.ejs',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/withpartial.ejs')
    });

    var stream = ejs({ title: 'gulp-ejs', msg: 'gulp-ejs', name: 'rpvl' });

    stream.on('data', function (newFile) {

      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(String(expectedFileWithPartial.contents));
      done();
    });

    stream.write(srcFile);
    stream.end();
  });

  it('should provide correct filenames', function (done) {

    var file1 = new gutil.File({
      path: 'foo',
      contents: new Buffer('<%- filename -%>.html')
    });

    var file2 = new gutil.File({
      path: 'bar',
      contents: new Buffer('<%- filename -%>.html')
    });

    var stream = ejs();

    stream.on('data', function (newFile) {

      newFile.contents.toString().should.equal(newFile.path);
      if (newFile.path == 'bar.html') done();
    });

    stream.write(file1);
    stream.write(file2);
    stream.end();
  })

  it('should support passing data with gulp-data', function (done) {
      var srcFile = new gutil.File({ path: 'test/fixtures/ok.ejs',
                                   cwd: 'test/',
                                   base: 'test/fixtures',
                                   contents: fs.readFileSync('test/fixtures/ok.ejs')
      });

      // simulate gulp-data plugin
      srcFile.data = { title: 'gulp-ejs' };

      var stream = ejs();

      stream.on('error', function (err) {
          should.exist(err);
          done(err);
      });

      stream.on('data', function (newFile) {

          should.exist(newFile);
          should.exist(newFile.contents);

          String(newFile.contents).should.equal(String(expectedFile.contents));
          done();
      });

      stream.write(srcFile);
      String(path.extname(srcFile.path)).should.equal('.html');

      stream.end();
  });

  describe('with assets', function () {
    it('should templating with javascripts', function (done) {
      var srcFile = new gutil.File({
        path: 'test/fixtures/config.js.ejs',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.readFileSync('test/fixtures/config.js.ejs')
      });

      var stream = ejs({
        baseUrl: 'https://github.com/rogeriopvl/gulp-ejs',
        FacebookApiToken: function () {
          return '0e24aa7fa3d7acffdb2085cec5ab0ce704f48318';
        }
      }, {
        ext: ''// remove .ejs extension
      });

      stream.on('data', function (newFile) {

        should.exist(newFile);
        should.exist(newFile.contents);
        path.extname(newFile.path).should.equal('.js')

        String(newFile.contents).should.equal(fs.readFileSync('test/expected/config.js', 'utf8'));
        done();
      });

      stream.write(srcFile);
      stream.end();
    });

    it('should templating with stylesheets', function (done) {
      var srcFile = new gutil.File({
        path: 'test/fixtures/head.css.ejs',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.readFileSync('test/fixtures/head.css.ejs')
      });

      var stream = ejs({
        fonts_path: function () {
          return '../fonts/fontawesome-webfont.eot?v=4.1.0';
        }
      }, {
        ext: ''// remove .ejs extension
      });

      stream.on('data', function (newFile) {

        should.exist(newFile);
        should.exist(newFile.contents);
        path.extname(newFile.path).should.equal('.css')

        String(newFile.contents).should.equal(fs.readFileSync('test/expected/head.css', 'utf8'));
        done();
      });

      stream.write(srcFile);
      stream.end();
    });
  });
});
