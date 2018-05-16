const fs = require('fs')
const path = require('path')
const PSD = require('../dist/index')
const psdPath = process.argv[2] || './example/p.psd'
const a = PSD.fromFile(psdPath)
a.parse()
const b = a.getTree()
// console.log(b)
module.exports = PSD

