"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Descriptor {
    constructor(file) {
        this.types = {
            'obj ': this.parseReference,
            'Objc': this.parseDescriptor,
            'VlLs': this.parseList,
            'doub': this.parseDouble,
            'UntF': this.parseUnitFloat,
            'TEXT': this.parseString,
            'enum': this.parseEnumerated,
            'long': this.parseInteger,
            'bool': this.parseBoolean,
            'GlbO': this.parseDescriptor,
            'type': this.parseClass,
            'GlbC': this.parseClass,
            'alis': this.parseAlias,
            'tdta': this.parseRawData
        };
        this.file = file;
    }
    parse(file) {
        const classData = this.parseClass();
        const itemNum = file.readInt();
        let data = {};
        for (let i = 0; i < itemNum; i++) {
            let o = this.parseKeyItem();
            data[o.id] = o.value;
        }
        return data;
    }
    parseClass() {
        return {
            name: this.file.readUnicodeString(),
            id: this.parseID()
        };
    }
    parseID() {
        let len = this.file.readInt() || 4;
        return this.file.readString(len);
    }
    parseKeyItem() {
        const a = {
            id: this.parseID(),
            value: this.parseItem()
        };
        return a;
    }
    parseItem() {
        let key = this.file.readString(4);
        if (key) {
            let a = this.types[key].call(this);
            return a;
        }
        return {};
    }
    parseReference() {
        let types = {
            'prop': this.parseProperty,
            'Clss': this.parseClass,
            'Enmr': this.parseEnumeratedReference,
            'rele': this.parseOffset,
            // 'Idnt' : this.parseIdentifier, // 文档中没有解析方法
            'indx': this.parseIndex,
        };
        let data = [];
        let itemNum = this.file.readInt();
        for (let i = 0; i < itemNum; i++) {
            let key = this.file.readString(4);
            data.push({
                type: key,
                value: types[key].call(this)
            });
        }
        return data;
    }
    ;
    parseProperty() {
        return {
            class: this.parseClass(),
            id: this.parseID()
        };
    }
    ;
    parseEnumeratedReference() {
        return {
            class: this.parseClass(),
            type: this.parseID(),
            value: this.parseID()
        };
    }
    ;
    parseOffset() {
        return this.file.readInt();
    }
    ;
    parseIndex() {
        return this.file.readInt();
    }
    ;
    parseDescriptor() {
        const d = new Descriptor(this.file);
        return d.parse(this.file);
    }
    ;
    parseList() {
        let itemNum = this.file.readInt();
        let data = [];
        for (let i = 0; i < itemNum; i++) {
            data.push(this.parseItem());
        }
        return data;
    }
    ;
    parseDouble() {
        return this.file.readDouble();
    }
    ;
    parseInteger() {
        return this.file.readInt();
    }
    ;
    parseUnitFloat() {
        let types = {
            '#Ang': 'Angle',
            '#Rsl': 'Density',
            '#Rlt': 'Distance',
            '#Nne': 'None',
            '#Prc': 'Percent',
            '#Pxl': 'Pixels',
            '#Mlm': 'Millimeters',
            '#Pnt': 'Points'
        };
        let unit = types[this.file.readString(4)], value = this.file.readDouble();
        return {
            unit: unit,
            value: value
        };
    }
    ;
    parseString() {
        return this.file.readUnicodeString();
    }
    ;
    parseEnumerated() {
        return {
            type: this.parseID(),
            value: this.parseID()
        };
    }
    ;
    parseBoolean() {
        return this.file.readBoolean();
    }
    ;
    parseAlias() {
        let len = this.file.readInt();
        return this.file.readString(len);
    }
    ;
    parseRawData() {
        return this.file.read(this.file.readInt());
    }
    ;
}
exports.default = Descriptor;
//# sourceMappingURL=description.js.map