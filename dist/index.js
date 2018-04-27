"use strict";
const fs = require("fs");
const psd_1 = require("./psd");
class Index {
    static fromFile(file) {
        return new psd_1.default(fs.readFileSync(file));
    }
}
module.exports = Index;
//# sourceMappingURL=index.js.map