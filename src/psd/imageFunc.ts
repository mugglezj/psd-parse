import psdRaw from './imageFormat/psdRaw'
import psdRLE from './imageFormat/psdRLE'
import rgb from './imageFormat/rgb'

export default class ImageFunc {
    static PSDFormat = [
        psdRaw,
        psdRLE
    ]

    constructor() {
    }

    static mergeImageData(layer,baseInfo) {
        const colorMode = layer.colorMode
        const Mode = {
            '3': rgb
        }
        if (Mode[colorMode])
            return Mode[colorMode](layer,baseInfo);

        throw 'Not support the colorMode';
    }
}