"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class ResourceSection {
    constructor() {
        this.RESOURCES = [
            require('./resources/layer_comps.coffee'),
            require('./resources/layer_links.coffee'),
            require('./resources/resolution_info.coffee')
        ];
    }
    factory(resource) {
        for (let Section in this.RESOURCES) {
            if (Section.id !== resource.id) {
                continue;
            }
            return lodash_1.default.tap(new Section(resource), (s) => { return s.parse(); });
        }
        return null;
    }
}
exports.default = ResourceSection;
//# sourceMappingURL=resource_section.js.map