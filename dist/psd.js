"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("./psd/file");
const header_1 = require("./psd/header");
const resources_1 = require("./psd/resources");
const layerMaskInfo_1 = require("./psd/layerMaskInfo");
class PSD {
    constructor(data) {
        this.parsed = false;
        this.file = new file_1.default(data);
    }
    parse() {
        if (this.parsed)
            return;
        this.parseHeader();
        this.parseResources();
        this.parseLayerMask();
        this.parsed = true;
    }
    parseHeader() {
        this.header = new header_1.default(this.file);
        this.header.parse();
    }
    parseResources() {
        let resources = new resources_1.default(this.file);
        let a = resources.parse();
    }
    parseLayerMask() {
        let layerMask = new layerMaskInfo_1.default(this.file);
        layerMask.parse();
    }
}
exports.default = PSD;
//# sourceMappingURL=psd.js.map