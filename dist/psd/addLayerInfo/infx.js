"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(file) {
    // Blend interior elements
    const key = 'infx';
    const blendInteriorElements = file.readByte();
    // parse padding
    file.seek(3, true);
    return {
        key,
        blendInteriorElements,
    };
}
exports.default = default_1;
//# sourceMappingURL=infx.js.map