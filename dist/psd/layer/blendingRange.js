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
        const num = (length - 8) / 8;
        blendingRange.channels = [];
    }
}
exports.default = BlendingRange;
//# sourceMappingURL=blendingRange.js.map