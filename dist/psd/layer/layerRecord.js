"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const mask_1 = require("./mask");
const blendingRange_1 = require("./blendingRange");
const addLayerInfo_1 = require("./addLayerInfo");
var MODES = {
    'pass': 'pass through',
    'norm': 'normal',
    'diss': 'dissolve',
    'dark': 'darken',
    'mul ': 'multiply',
    'idiv': 'color burn',
    'lbrn': 'linear burn',
    'dkCl': 'darker color',
    'lite': 'lighten',
    'scrn': 'screen',
    'div ': 'color dodge',
    'lddg': 'linear dodge',
    'lgCl': 'lighter color',
    'over': 'overlay',
    'sLit': 'soft light',
    'hLit': 'hard light',
    'vLit': 'vivid light',
    'lLit': 'linear light',
    'pLit': 'pin light',
    'hMix': 'hard mix',
    'diff': 'difference',
    'smud': 'exclusion',
    'fsub': 'subtract',
    'fdiv': 'divide',
    'hue ': 'hue',
    'sta ': 'saturation',
    'colr': 'color',
    'lum ': 'luminosity'
};
class Layer {
    constructor(file) {
        this.file = file;
    }
    parse() {
        let file = this.file;
        var top = file.readInt(), left = file.readInt(), bottom = file.readInt(), right = file.readInt();
        var channelCount = file.readShort();
        var channelInfo = [];
        for (var i = 0; i < channelCount; i++) {
            var o = {};
            o.id = file.readShort();
            o.length = file.readInt(); //data Length
            channelInfo.push(o);
        }
        // 'pass' = pass through, 'norm' = normal, 'diss' = dissolve, 'dark' = darken, 'mul ' = multiply, 'idiv' = color burn, 'lbrn' = linear burn, 'dkCl' = darker color, 'lite' = lighten, 'scrn' = screen, 'div ' = color dodge, 'lddg' = linear dodge, 'lgCl' = lighter color, 'over' = overlay, 'sLit' = soft light, 'hLit' = hard light, 'vLit' = vivid light, 'lLit' = linear light, 'pLit' = pin light, 'hMix' = hard mix, 'diff' = difference, 'smud' = exclusion, 'fsub' = subtract, 'fdiv' = divide 'hue ' = hue, 'sat ' = saturation, 'colr' = color, 'lum ' = luminosity,
        // 混合模式
        var blendModeSig = file.readString(4), // '8BIM'
        blendModeKey = file.readString(4), // 混合模式关键字
        opacity = file.readByte(), clipping = file.readByte(), flag = file.readByte(), visible = !((flag & (0x01 << 1)) > 0), filler = file.readByte(), extraLen = file.readInt(), endPos = file.tell() + extraLen;
        if (blendModeSig !== '8BIM')
            console.error('wrong in layerRecorder');
        var layerMaskData = (new mask_1.default(file)).parse();
        var blendingRangesData = (new blendingRange_1.default(file)).parse();
        var a = file.readByte();
        var nameLength = util_1.default.pad4(a), name = file.readString(nameLength);
        console.log('====');
        console.log(name);
        var additional = (new addLayerInfo_1.default(file)).parse(endPos);
        console.log('----');
        // file.seek(endPos - file.tell());
        file.seek(endPos);
        return {
            top: top,
            right: right,
            bottom: bottom,
            left: left,
            width: right - left,
            height: bottom - top,
            channelCount: channelCount,
            channelInfo: channelInfo,
            blendMode: MODES[blendModeKey],
            opacity: opacity,
            visible: visible,
            legacyName: name,
            additional: additional
        };
    }
}
exports.default = Layer;
//# sourceMappingURL=layerRecord.js.map