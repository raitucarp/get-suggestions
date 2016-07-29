[![NPM](https://nodei.co/npm/get-suggestions.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/get-suggestions/)

[![Build Status](https://travis-ci.org/raitucarp/get-suggestions.svg?branch=master)](https://travis-ci.org/raitucarp/get-suggestions)

# Introduction

Get Google suggestion with 1 level deep (a-z, 0-9) with es6 promise. For example, with gardening as a keyword, it will fetch suggestions for:
- gardening a
- gardening b
- ....
- gardening z
- gardening 1
- gardening 2
- ...
- gardening 10

Since this library get 1 level deep suggestions, it will take longer to fetch than simple suggestion. See ```test.js``` for example

# Install
```bash
npm install get-suggestions
```
# Usage

```javascript
const Suggestion = require('get-suggestions')
let s = new Suggestion("gardening")
s.get()
    .then(suggestions=> console.log(suggestions))
    .catch(err => console.error(err))
```

# Documentation

## new Suggestion(keyword)
Create new suggestion object

## .simple(boolean)
Set suggestion keep simple, with no level depth.

## .setKeyword(keyword)
Set keyword of suggestion.

## .get()
Get suggestions data. Returns as promise object

## .userAgent(ua)
Set user agent of request client. Default value is developer current browser.

## .setMinimumTimeout(min)
Set minimum number of timeout to prevent blocked.

## .setMaximumTimeout(max)
Set maximum number of timeout to prevent blocked.

# TODO
- Add (tor) proxy support.
- More documentation
- More method

# License
MIT
