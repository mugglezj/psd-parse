"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PsdRLE {
    constructor(file, baseInfo) {
        const { channels, height } = baseInfo;
        const byteCounts = this._parseByteCounts(height, channels, file);
        let channelInfo = [];
        for (let i = 0; i < channels; i++) {
            //将 RRR GGG BBB 处理为通道模式
            /*
            * 根据通道的方式处理
            * 每次只处理一个通道
            * decodeRLE中根据通道处理
            * */
            channelInfo.push({
                id: i,
                data: this._decodeRLE(height, file, byteCounts.slice(height * i, height * (i + 1)))
            });
        }
        this.channelInfo = channelInfo;
    }
    _parseByteCounts(height, channels, file) {
        var temp = [];
        for (var i = 0; i < channels * height; i++) {
            temp.push(file.readShort());
        }
        return temp;
    }
    _decodeRLE(height, file, bytes) {
        var byteCount, endPos, len;
        var data = [], val;
        for (var i = 0; i < height; i++) {
            byteCount = bytes[i];
            endPos = file.tell() + byteCount;
            while (file.tell() < endPos) {
                len = file.readByte();
                //i don`t know
                if (len < 128) {
                    len++;
                    data.splice.apply(data, [data.length, 0].concat([].slice.call(file.read(len))));
                }
                else if (len > 128) {
                    len ^= 0xff;
                    len += 2;
                    val = file.readByte();
                    for (var l = 0; l < len; l++) {
                        data.push(val);
                    }
                }
                //            else len==128 do nothing;
            }
        }
        return data;
    }
}
exports.default = PsdRLE;
//# sourceMappingURL=psdRLE.js.map