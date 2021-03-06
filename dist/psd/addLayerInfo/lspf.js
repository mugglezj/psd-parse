"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(file) {
    // protected setting
    const key = 'lspf';
    const locked = file.readInt();
    const transparencyLocked = (locked & (0x01 << 0)) > 0 || locked == -2147483648;
    const compositeLocked = (locked & (0x01 << 1)) > 0 || locked == -2147483648;
    const positionLocked = (locked & (0x01 << 2)) > 0 || locked == -2147483648;
    return {
        key,
        locked,
        transparencyLocked,
        compositeLocked,
        positionLocked,
    };
}
exports.default = default_1;
//# sourceMappingURL=lspf.js.map