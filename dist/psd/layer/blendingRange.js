"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlendingRange {
    constructor(file) {
        this.file = file;
    }
    parse() {
        const file = this.file;
        const length = file.readInt();
        const endPos = file.tell() + length;
        let blendingRange = {};
        blendingRange.gray = {
            source: {
                black: [file.readByte(), file.readByte()],
                white: [file.readByte(), file.readByte()]
            },
            dist: {
                black: [file.readByte(), file.readByte()],
                white: [file.readByte(), file.readByte()]
            }
        };
        // channel source range，去除前面8位信息，剩余都是各通道信息
        const num = (length - 8) / 8;
        blendingRange.channels = [];
        for (var i = 0; i < num; i++) {
            blendingRange.channels.push({
                source: {
                    black: [file.readByte(), file.readByte()],
                    white: [file.readByte(), file.readByte()]
                },
                dist: {
                    black: [file.readByte(), file.readByte()],
                    white: [file.readByte(), file.readByte()]
                }
            });
        }
        return blendingRange;
    }
}
exports.default = BlendingRange;
//# sourceMappingURL=blendingRange.js.map