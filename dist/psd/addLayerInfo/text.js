"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(file) {
    const key = 'TEXT';
    const length = file.readInt();
    const string = file.readString(length);
    console.log(string);
    return {
        key,
        string,
    };
}
exports.default = default_1;
//# sourceMappingURL=text.js.map