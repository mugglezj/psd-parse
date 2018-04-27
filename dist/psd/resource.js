"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const layer_links_1 = require("./resources/layer_links");
const slices_1 = require("./resources/slices");
let Resources = {};
Resources[layer_links_1.default.id] = layer_links_1.default;
Resources[slices_1.default.id] = slices_1.default;
class Resource {
    constructor(file) {
        this.Section = {};
        this.id = null;
        this.length = 0;
        this.name = '';
        this.file = file;
    }
    parse() {
        this.sig = this.file.readString(4); //sig=8BIM
        this.id = this.file.readShort();
        const nameSize = this.file.readByte(); //pascal string; first byte meas length
        const nameLength = util_1.default.pad2(nameSize + 1) - 1;
        // todo empty name,something wrong here
        this.name = this.file.readString(nameLength);
        this.length = util_1.default.pad2(this.file.readInt());
        let block = {};
        if (Resources[this.id]) {
            // console.log(this.id)
            block[this.id] = Resources[this.id].parse(this.file, this.length);
        }
        else {
            this.file.seek(this.length, true);
        }
        return { id: this.id, detail: block[this.id] };
    }
}
exports.default = Resource;
//# sourceMappingURL=resource.js.map