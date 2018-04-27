"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resource_1 = require("./Resource");
class Resources {
    constructor(file) {
        this.resources = {};
        this.typeIndex = {};
        this.length = null;
        this.file = file;
    }
    skip() {
        this.length = this.file.readInt();
        this.file.seek(this.length, true);
    }
    parse() {
        this.length = this.file.readInt();
        const finish = this.length + this.file.tell();
        let imageResources = {};
        imageResources.startPos = this.file.tell();
        imageResources.length = this.length;
        imageResources.imageResources = {};
        while (this.file.tell() < finish) {
            let resource = new Resource_1.default(this.file);
            let block = resource.parse();
            imageResources.imageResources[block.id] = [block.detail];
            // let resourceEnd = this.file.tell() + resource.length
            //
            // let section = Resource.Section.factory(resource)
            // if (!section) {
            //     this.file.seek(resourceEnd)
            //     continue
            // }
            //
            // this.resources[section.id] = section
            // if (section.name) {
            //     this.typeIndex[section.name] = section.id
            //
            // }
            // this.file.seek(resourceEnd)
        }
        this.file.seek(finish);
        return imageResources;
    }
    resource(search) {
        if (typeof (search) == 'string') {
            this.byType(search);
        }
        else {
            this.resources[search];
        }
    }
    byType(name) {
        return this.resources[this.typeIndex[name]];
    }
}
exports.default = Resources;
//# sourceMappingURL=resources.js.map