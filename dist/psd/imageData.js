"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const pngjs_1 = require("pngjs");
const imageFunc_1 = require("./imageFunc");
class imageData {
    constructor(file) {
        this.file = file;
    }
    parse() {
        // const file = this.file
        // let compression = file.readShort()
        // console.log(compression)
    }
    saveAsPng(baseInfo, output) {
        const pixelData = this.toImageData(baseInfo);
        const png = new pngjs_1.PNG({
            width: baseInfo.width,
            height: baseInfo.height,
            filterType: 4
        });
        if (pixelData) {
            png.data = pixelData;
            png.pack().pipe(fs.createWriteStream(output));
        }
    }
    toImageData(baseInfo) {
        const file = this.file;
        const compression = file.readShort();
        const channel = new imageFunc_1.default.PSDFormat[compression](file, baseInfo);
        const channelInfo = channel.channelInfo;
        const layer = {
            width: baseInfo.width,
            height: baseInfo.height,
            channelInfo: channelInfo,
            colorMode: baseInfo.colorMode,
        };
        const pixelData = imageFunc_1.default.mergeImageData(layer, baseInfo);
        return pixelData;
    }
}
exports.default = imageData;
//# sourceMappingURL=imageData.js.map