import File from './file'
import Util from './util'
import parseLayer from './layer/layerRecord'
import parseChannelImage from './layer/channelImage'
export default class layerMaskInfo {
    file:File
    constructor(file) {
        this.file = file
    }
    parse(baseInfo) {
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
        // todo
        layerInfo.layers.forEach((layer)=>{
            parseChannelImage(layer,file, baseInfo.mode)
        })


        layerInfo.layers.reverse();

        file.seek(length+startPos+4)
        return layerMaskInfo
    }
}