"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(file) {
    // Unicode Layer name
    const key = 'luni';
    const layerName = file.readUnicodeString();
    return {
        key,
        layerName,
    };
}
exports.default = default_1;
//# sourceMappingURL=luni.js.map