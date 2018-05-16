"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const layerid_1 = require("../layerInfo/layerid");
const layername_1 = require("../layerInfo/layername");
const sectiondivider_1 = require("../layerInfo/sectiondivider");
const addLayerInfos = require("../addLayerInfo");
let LAYER_INFO = {};
LAYER_INFO[layerid_1.default.id] = layerid_1.default;
LAYER_INFO[layername_1.default.id] = layername_1.default;
LAYER_INFO[sectiondivider_1.default.id] = sectiondivider_1.default;
class Additional {
    constructor(file) {
        this.file = file;
    }
    parse(endPos) {
        var o = {};
        let file = this.file;
        while (file.tell() < endPos) {
            var sig = file.readString(4), key = file.readString(4), len = util_1.default.pad2(file.readInt()), end = file.tell() + len;
            // todo read additional layer info
            if (addLayerInfos[key]) {
                o[key] = addLayerInfos[key](file);
            }
            else {
                console.log(`key=${key}`);
            }
            // if(LAYER_INFO[key]){
            //     o[key] = LAYER_INFO[key].parse(file);
            // }
            // file.seek(end - file.tell());
            file.seek(end);
        }
        console.log(o);
        return o;
    }
}
exports.default = Additional;
//# sourceMappingURL=addLayerInfo.js.map