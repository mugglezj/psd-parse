"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const psdRaw_1 = require("./imageFormat/psdRaw");
const psdRLE_1 = require("./imageFormat/psdRLE");
const rgb_1 = require("./imageFormat/rgb");
class ImageFunc {
    constructor() {
    }
    static mergeImageData(layer, baseInfo) {
        const colorMode = layer.colorMode;
        const Mode = {
            '3': rgb_1.default
        };
        if (Mode[colorMode])
            return Mode[colorMode](layer, baseInfo);
        throw 'Not support the colorMode';
    }
}
ImageFunc.PSDFormat = [
    psdRaw_1.default,
    psdRLE_1.default
];
exports.default = ImageFunc;
//# sourceMappingURL=imageFunc.js.map