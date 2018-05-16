"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pngjs_1 = require("pngjs");
const fs = require("fs");
const imageFunc_1 = require("../imageFunc");
function parseCompression(file) {
    return file.readShort();
}
function parseImageData(layer, file) {
    var compression = parseCompression(file);
    return imageFunc_1.default.layerFormat[compression](layer, file);
}
function default_1(layer, file, colorMode) {
    var parsed = false;
    var pos = file.tell();
    for (var i = 0, l = layer.channelInfo.length; i < l; i++) {
        //skip first
        var channel = layer.channelInfo[i];
        file.seek(channel.length, file.tell());
    }
    layer.parseImageData = function () {
        var self = this;
        if (parsed)
            return self.pixelData;
        file.tell(pos);
        for (var i = 0, l = self.channelInfo.length; i < l; i++) {
            var channel = self.channelInfo[i];
            if (channel.length <= 0) {
                parseCompression(file); // 压缩位
                channel.data = [];
                continue;
            }
            var startPos = file.tell();
            channel.data = parseImageData(self, file);
            file.seek(channel.length, startPos);
        }
        self.pixelData = imageFunc_1.default.mergeImageData(self, colorMode);
        parsed = true;
        return self.pixelData;
    };
    layer.saveAsPng = function (output) {
        var self = this;
        self.parseImageData();
        var png = new pngjs_1.PNG({
            width: self.width,
            height: self.height,
            filterType: 4
        });
        if (self.pixelData) {
            png.data = self.pixelData;
            png.pack().pipe(fs.createWriteStream(output));
        }
        else {
            throw 'Not support the colorMode';
        }
    };
}
exports.default = default_1;
;
//# sourceMappingURL=channelImage.js.map