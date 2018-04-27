"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class root extends node_1.default {
    layerForPsd(psd) {
        let layer = {};
        //todo
        for (let prop in node_1.default.PROPERTIES) {
            layer[prop] = null;
        }
        layer.top = 0;
        layer.left = 0;
        layer.right = psd.header.width;
        layer.bottom = psd.header.height;
        return layer;
    }
}
exports.default = root;
//# sourceMappingURL=root.js.map