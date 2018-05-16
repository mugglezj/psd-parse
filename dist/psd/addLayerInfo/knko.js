"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(file) {
    // Knockout setting
    const key = 'knko';
    const knockOut = file.readByte();
    // parse padding
    file.seek(3, true);
    return {
        key,
        knockOut,
    };
}
exports.default = default_1;
//# sourceMappingURL=knko.js.map