// merge RGB, channel num is 4
// -1=a, 0=r, 1=g, 2=b
export default function(layer){
    var pixelNum = layer.width * layer.height;
    var pixelData = [];

    var a, r, g, b;
    for(var j=0; j<pixelNum; j++){
        a = 255;r=g=b=0;
        for(var i=0; i<layer.channelInfo.length; i++){
            var v = layer.channelInfo[i];

            switch (v.id){
                case -1: a = v.data[j];break;
                case  0: r = v.data[j];break;
                case  1: g = v.data[j];break;
                case  2: b = v.data[j];break;
            }
        }
        pixelData.push(r, g, b, a);
    }
    return pixelData
};