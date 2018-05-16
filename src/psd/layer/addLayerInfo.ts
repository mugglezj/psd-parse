import File from '../File'
import Util from '../util'
import layerid from '../layerInfo/layerid'
import layername from '../layerInfo/layername'
import sectiondivider from '../layerInfo/sectiondivider'
import * as addLayerInfos from '../addLayerInfo'


let LAYER_INFO = {}
LAYER_INFO[layerid.id] = layerid
LAYER_INFO[layername.id] = layername
LAYER_INFO[sectiondivider.id] = sectiondivider

export default class Additional{
    file: File
    constructor(file){
        this.file = file
    }
    parse(endPos) {
        var o = {};
        let file = this.file
        while (file.tell() < endPos){
            var sig = file.readString(4),
                key = file.readString(4),
                len = Util.pad2(file.readInt()),
                end = file.tell() + len;

            // todo read additional layer info

            if (addLayerInfos[key]) {
                o[key] = addLayerInfos[key](file)
            } else{
                console.log(`key=${key}`)

            }


            // if(LAYER_INFO[key]){
            //     o[key] = LAYER_INFO[key].parse(file);
            // }
            // file.seek(end - file.tell());
            file.seek(end)

        }
        console.log(o)
        return o;
    }
}