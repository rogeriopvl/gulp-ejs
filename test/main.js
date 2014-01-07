/*global describe, it*/
'use strict';

var fs = require('fs'),
should = require('should');
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
});
