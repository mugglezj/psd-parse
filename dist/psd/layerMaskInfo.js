"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const layerRecord_1 = require("./layer/layerRecord");
const channelImage_1 = require("./layer/channelImage");
class layerMaskInfo {
    constructor(file) {
        this.file = file;
    }
    parse(baseInfo) {
        let layerMaskInfo = {};
        let file = this.file;
        let startPos = file.tell();
        let length = file.readInt();
        let layerInfo = layerMaskInfo.layerInfo = {};
        layerInfo.length = util_1.default.pad2(file.readInt());
        layerInfo.layerCount = file.readShort();
        let mergedAlpha = false;
        if (layerInfo.layerCount < 0) {
            layerInfo.layerCount = -layerInfo.layerCount;
            //Layer count. If it is a negative number, its absolute value is the number of layers and the first alpha channel contains the transparency data for the merged result.
            mergedAlpha = true;
        }
        layerInfo.layers = [];
        for (var i = 0; i < layerInfo.layerCount; i++) {
            layerInfo.layers.push((new layerRecord_1.default(file)).parse());
        }
        // todo
        layerInfo.layers.forEach((layer) => {
            channelImage_1.default(layer, file, baseInfo.mode);
        });
        layerInfo.layers.reverse();
        file.seek(length + startPos + 4);
        return layerMaskInfo;
    }
}
exports.default = layerMaskInfo;
//# sourceMappingURL=layerMaskInfo.js.map