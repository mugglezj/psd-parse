const fs = require('fs')
const path = require('path')
const PSD = require('../dist/index')

const a = PSD.fromFile(path.resolve(__dirname,'./p.psd'))
a.parse()
module.exports = PSD

