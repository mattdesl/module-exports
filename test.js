var convert = require('./')
var test = require('tape').test
var concat = require('concat-stream')

test('wrap in commonjs exports', function(t) {
    t.plan(2)

    var s = convert()
    var input = JSON.stringify({ foo: 'b\"lah', bar: [25, false, "foo", { }]})
    s.end(input)
    s.pipe(concat(function(body) {
        t.equal(body.toString('utf8'), 'module.exports = '+input+';', 'with semicolon')
    }))

    s = convert({ semicolon: false })
    s.end(input)
    s.pipe(concat(function(body) {
        t.equal(body.toString('utf8'), 'module.exports = '+input, 'without semicolon')
    }))
})