const Suggestion = require('./index')
import test from 'ava'

test.cb('Get suggestions from gardening', t => {
    let s = new Suggestion('gardening')
    s.get()
    .then(suggestions => {
        t.truthy(suggestions)
        t.is(suggestions.length > 0, true)
        t.pass()
        t.end()
    })
    .catch(err => {
        t.fail(err)
        t.end()
    })
})

test.cb('Get simple suggestions from fishing', t => {
    let s = new Suggestion('fishing').simple(true)
    s.get().then(suggestions => {
        t.truthy(suggestions)
        t.is(suggestions.length > 0, true)
        t.pass()
        t.end()
    }).catch(err => {
        t.fail(err)
        t.end()
    })
})
