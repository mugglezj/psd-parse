"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(file) {
    // Sheet Color setting
    const key = 'lclr';
    const color = [file.readInt(), file.readInt()];
    return {
        key,
        color
    };
}
exports.default = default_1;
//# sourceMappingURL=lclr.js.map