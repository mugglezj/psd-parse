"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const description_1 = require("./description");
const parseEngineData = require("parse-engine-data");
const texthelper_1 = require("./texthelper");
function default_1(file) {
    const key = 'tysh';
    const version = file.readShort();
    const transformInfo = {
        xx: file.readDouble(),
        xy: file.readDouble(),
        yx: file.readDouble(),
        yy: file.readDouble(),
        tx: file.readDouble(),
        ty: file.readDouble(),
    };
    const textVersion = file.readShort();
    const descriptorVersion = file.readInt();
    const textData = (new description_1.default(file)).parse(file);
    textData.EngineData = parseEngineData(textData.EngineData);
    textData.parsed = texthelper_1.default(textData);
    const warpVersion = file.readShort();
    const descriptorVersion2 = file.readInt();
    const warpData = (new description_1.default(file)).parse(file);
    // const warpData = ''
    const position = {
        left: file.readDouble(),
        top: file.readDouble(),
        right: file.readDouble(),
        bottom: file.readDouble(),
    };
    const res = {
        key,
        version,
        transformInfo,
        textVersion,
        descriptorVersion,
        textData,
        warpVersion,
        descriptorVersion2,
        warpData,
        position
    };
    return res;
}
exports.default = default_1;
//# sourceMappingURL=tysh.js.map