import File from '../file'
import Util from '../util'
import parseMask from './mask'
import parseBlendingRange from './blendingRange'
import parseAdditional from './addLayerInfo'

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

export default class Layer{
    file:File
    constructor(file) {
        this.file = file
    }
    parse() {
        let file = this.file
        var top = file.readInt(),
            left = file.readInt(),
            bottom = file.readInt(),
            right = file.readInt();

        var channelCount = file.readShort();


        var channelInfo = [];
        for(var i=0; i<channelCount; i++){
            var o:any = {};
            o.id = file.readShort();
            o.length = file.readInt(); //data Length
            channelInfo.push(o);
        }

        var blendModeSig = file.readString(4), // '8BIM'
            blendModeKey = file.readString(4),
            opacity = file.readByte(),
            clipping= file.readByte(),
            flag = file.readByte(),
            visible = !((flag & (0x01 << 1)) > 0),
            filler = file.readByte(),

            extraLen = file.readInt(),
            endPos = file.tell()+extraLen;
        if (blendModeSig !== '8BIM') console.error('wrong in layerRecorder')
        var layerMaskData = (new parseMask(file)).parse();
        var blendingRangesData = (new parseBlendingRange(file)).parse();

        var nameLength = Util.pad4(file.readByte())-1,
            name = file.readString(nameLength);
        // var additional = parseAdditional(file, endPos);

        file.seek(endPos - file.tell());

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
        }
    }

}