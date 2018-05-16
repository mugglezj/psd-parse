"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(file) {
    // Layer name source setting
    const key = 'clbl';
    const blendClippedElements = file.readByte();
    // parse padding
    file.seek(3, true);
    return {
        key,
        blendClippedElements,
    };
}
exports.default = default_1;
//# sourceMappingURL=clbl.js.map