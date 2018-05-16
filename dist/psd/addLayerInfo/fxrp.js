"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(file) {
    // protected setting
    const key = 'fxrp';
    const refrencePoint = [file.readDouble(), file.readDouble()];
    return {
        key,
        refrencePoint
    };
}
exports.default = default_1;
//# sourceMappingURL=fxrp.js.map