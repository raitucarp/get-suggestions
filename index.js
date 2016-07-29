const request = require('request')
const moment = require('moment')
const _ = require('lodash')
const linkify = require('linkify-it')()
const Chance = require('chance')
const chance = new Chance()
const alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890'
const suggestURL = 'http://suggestqueries.google.com/complete/search'

class Suggestion {
    constructor(keyword) {
        this._keyword = keyword
        this._timeout = {
            min: 740,
            max: 1650
        }
        this.data = []
        this._userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36'
    }

    userAgent(ua) {
        this._userAgent = ua
        return this
    }

    setMinimumTimeout(min) {
        this._timeout.min = min
        return this
    }

    setMaximumTimeout(max) {
        this._timeout.max = max
        return this
    }

    doSuggest() {
        let timeoutRange = {
            min: this._timeout.min,
            max: this._timeout.max
        }
        let time = chance.natural(timeoutRange)
        let qs = {
            q: this._keyword,
            client: 'chrome',
            '_': moment().format('x')
        }
        let url = suggestURL
        let opts = {
            url, qs,
            headers: {
                'User-Agent': this._userAgent,
                'X-Chrome-UMA-Enabled': 1
            },
            jar: true,
            json: true
        }

        let collections = this.data

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                request(opts, (error, response, body) => {
                    if (error) {
                        return reject(error)
                    }

                    if (response.statusCode == 200) {
                        let [,suggestions] = body
                        let s = _.chain(collections)
                            .concat(suggestions)
                            .filter(data => !linkify.test(data))
                            .uniq()
                            .value()
                        return resolve(s)
                    }

                    return reject('Status is' + response.statusCode)
                })
            }, time)
        })
    }

    setKeyword(keyword) {
        this._keyword = keyword
        return this
    }

    simple(simple) {
        this._simple = simple
        return this
    }

    get() {
        let keyword = this._keyword
        let s = this.doSuggest()

        let $this = this

        if (this._simple) {
            return s
        }

        for(let i = 0; i< alphabet.length; i++) {
            s = s.then(suggestions => {
                $this.data = suggestions
                $this.setKeyword(`${keyword} ${alphabet[i]}`)
                return $this.doSuggest()
            })
        }

        return s
    }
}

module.exports = Suggestion
