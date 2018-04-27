var fs = require('fs')
var vm = require('vm')
var path = require('path')
var p = require('./example.js')
fs.watch(('./example/example.js'), {recursive: true}, (filetype, filename) => {
    // console.log('====')
    // cleanCache(require.resolve('./example.js'))
    // require(path.resolve('./example/example.js'))
})

// function cleanCache(modulePath) {
//     require.cache[modulePath] = null
// }

