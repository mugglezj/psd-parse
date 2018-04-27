import File from './file'
import Util from './util'
import parseLayer from './layer/layerRecord'
export default class layerMaskInfo {
    file:File
    constructor(file) {
        this.file = file
    }
    parse() {
        let layerMaskInfo:any = {}
        let file = this.file
        let startPos = file.tell()
        let length = file.readInt()

        let layerInfo:any = layerMaskInfo.layerInfo = {}
        layerInfo.length = Util.pad2(file.readInt())
        layerInfo.layerCount = file.readShort()

        let mergedAlpha = false
        if (layerInfo.layerCount < 0){
            layerInfo.layerCount = -layerInfo.layerCount;
            //Layer count. If it is a negative number, its absolute value is the number of layers and the first alpha channel contains the transparency data for the merged result.
            mergedAlpha = true;
        }

        layerInfo.layers = [];

        for (var i= 0; i<layerInfo.layerCount; i++){
            layerInfo.layers.push((new parseLayer(file)).parse());
        }


    }
}