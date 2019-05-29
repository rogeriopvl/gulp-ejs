'use strict'

/* eslint-env mocha */

const assert = require('assert')
const Vinyl = require('vinyl')
const data = require('gulp-data')
const ejsDependency = require('ejs')

const ejs = require('../')

describe('gulp-ejs', function() {
  it('should expose ejs global object', function() {
    assert.strictEqual(ejs.__EJS__, ejsDependency)
  })

  it('should work with no suplied data', done => {
    const stream = ejs()

    stream.on('data', data => {
      assert.strictEqual(data.contents.toString(), '')
    })

    stream.on('end', done)

    stream.write(
      new Vinyl({
        contents: Buffer.from('')
      })
    )

    stream.end()
  })

  it('should render ejs template', done => {
    const stream = ejs({ title: 'gulp-ejs' })

    stream.on('data', data => {
      assert.strictEqual(data.contents.toString(), '<h1>gulp-ejs</h1>')
    })

    stream.on('end', done)

    stream.write(
      new Vinyl({
        contents: Buffer.from('<h1><%= title %></h1>')
      })
    )

    stream.end()
  })

  it('should throw error when syntax is incorrect', done => {
    const stream = ejs({ title: 'gulp-ejs' })

    stream.on('error', err => {
      assert.ok(err)
      done()
    })

    stream.on('end', done)

    stream.write(
      new Vinyl({
        contents: Buffer.from('<h1><%= title</h1>')
      })
    )

    stream.end()
  })

  it('should support passing data with gulp-data', function(done) {
    const output = []

    const stream = data(file => {
      return {
        message: 'Hello world!'
      }
    })

    stream.pipe(ejs({ title: 'gulp-ejs' }))

    stream.on('data', chunk => {
      output.push(chunk.contents.toString())
    })

    stream.on('end', () => {
      const expected = '<h1>gulp-ejs</h1><p>Hello world!</p>'
      assert.strictEqual(output.join(''), expected)
      done()
    })

    stream.write(
      new Vinyl({
        contents: Buffer.from('<h1><%= title %></h1>')
      })
    )

    stream.write(
      new Vinyl({
        contents: Buffer.from('<p><%= message %></p>')
      })
    )

    stream.end()
  })

  it('should render async ejs template', function(done) {
    /* Skip test if async function is not supported (Node 7.5-) */
    try {
      /* eslint-disable-next-line no-new-func */
      (new Function('return (async function(){}).constructor;'))()
    } catch (e) {
      if (e instanceof SyntaxError) {
        this.skip()
      } else {
        throw e
      }
    }

    const title = () => new Promise((resolve, reject) => {
      process.nextTick(() => resolve('gulp-ejs'))
    })
    const stream = ejs({ title: title }, { async: true })

    stream.on('data', data => {
      assert.strictEqual(data.contents.toString(), '<h1>gulp-ejs</h1>')
    })

    stream.on('end', done)

    stream.write(
      new Vinyl({
        contents: Buffer.from('<h1><%= await title() %></h1>')
      })
    )

    stream.end()
  })
})
