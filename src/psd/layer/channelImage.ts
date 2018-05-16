import {PNG} from 'pngjs'
import * as fs from 'fs'
import imageFun from '../imageFunc'


function parseCompression(file){
    return file.readShort()
}

function parseImageData(layer, file){
    var compression = parseCompression(file);
    return imageFun.layerFormat[compression](layer, file);
}


export default function (layer, file, colorMode) {
    var parsed = false;
    var pos = file.tell();

    for (var i = 0, l = layer.channelInfo.length; i < l; i++) {
        //skip first
        var channel = layer.channelInfo[i];
        file.seek(channel.length, file.tell());
    }

    layer.parseImageData = function(){
        var self = this;

        if (parsed) return self.pixelData;

        file.tell(pos);
        for (var i = 0, l = self.channelInfo.length; i < l; i++) {
            var channel = self.channelInfo[i];
            if (channel.length <= 0){
                parseCompression(file);// 压缩位
                channel.data = [];
                continue;
            }

            var startPos = file.tell();
            channel.data = parseImageData(self, file);
            file.seek(channel.length, startPos);
        }
        self.pixelData = imageFun.mergeImageData(self, colorMode);
        parsed = true;
        return self.pixelData
    };

    layer.saveAsPng = function(output){
        var self = this;
        self.parseImageData();
        var png = new PNG({
            width: self.width,
            height: self.height,
            filterType: 4
        });
        if(self.pixelData){
            png.data = self.pixelData;
            png.pack().pipe(fs.createWriteStream(output))
        } else {
            throw 'Not support the colorMode'
        }
    };
};