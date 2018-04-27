"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class layerLinks {
    constructor() {
        this.name = 'layerLink';
    }
    static parse(file, size) {
        var linkArr = [];
        var end = file.tell() + size;
        while (end > file.tell()) {
            linkArr.push(file.readShort());
        }
        // file.tell();
        return linkArr.reverse();
    }
}
layerLinks.id = 1026;
exports.default = layerLinks;
//# sourceMappingURL=layer_links.js.map