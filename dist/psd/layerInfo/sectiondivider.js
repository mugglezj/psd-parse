"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 图层组
exports.default = {
    id: 'lsct',
    parse: function (file) {
        var type = file.readInt();
        file.seek(4); // sig
        var blendMode = file.readInt(), subType = file.readInt();
        return {
            type: type,
            blendMode: blendMode,
            subType: subType
        };
    }
};
//# sourceMappingURL=sectiondivider.js.map