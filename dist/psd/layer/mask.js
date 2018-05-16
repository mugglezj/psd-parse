"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mask {
    constructor(file) {
        this.file = file;
    }
    parse() {
        // todo laye mask/adjustment layer data
        let file = this.file;
        const size = file.readInt();
        const endPos = file.tell() + size;
        if (size == 0)
            return null;
        const top = file.readInt();
        const left = file.readInt();
        const bottom = file.readInt();
        const right = file.readInt();
        const defaultColor = file.readByte();
        const flag = file.readByte();
        // Flags.
        // bit 0 = position relative to layer
        // bit 1 = layer mask disabled
        // bit 2 = invert layer mask when blending (Obsolete)
        // bit 3 = indicates that the user mask actually came from rendering other data
        // bit 4 = indicates that the user and/or vector masks have parameters applied to them
        file.seek(endPos);
        return {
            top: top,
            right: right,
            bottom: bottom,
            left: left,
            width: right - left,
            height: bottom - top,
            defaultColor: defaultColor
        };
    }
}
exports.default = Mask;
//# sourceMappingURL=mask.js.map