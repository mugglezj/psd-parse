"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(file) {
    // layer id 和文档中的不一样
    const key = 'lyid';
    const id = file.readInt();
    return {
        key,
        id
    };
}
exports.default = default_1;
//# sourceMappingURL=lyid.js.map