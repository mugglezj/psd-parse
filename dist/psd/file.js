"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jspack_1 = require("jspack");
const Iconv = require("iconv-lite");
class File {
    constructor(data) {
        this.pos = 0;
        this.data = data;
    }
    tell() {
        return this.pos;
    }
    read(length) {
        let res = [];
        for (let i = 0; i < length; i++) {
            res.push(this.data[this.pos++]);
        }
        return res;
    }
    readf(format, len = null) {
        return jspack_1.jspack.Unpack(format, this.read(len || jspack_1.jspack.CalcLength(format)));
    }
    seek(amt, rel = false) {
        if (rel) {
            this.pos += amt;
        }
        else {
            this.pos = amt;
        }
    }
    readString(length) {
        let s = String.fromCharCode.apply(null, this.read(length)).replace(/\u0000/g, '');
        return s;
    }
    readInt() {
        let code = '>i';
        let length = 4;
        return this.readf(code, length)[0];
    }
    readUInt() {
        let code = '>I';
        let length = 4;
        return this.readf(code, length)[0];
    }
    readShort() {
        let code = '>h';
        let length = 2;
        return this.readf(code, length)[0];
    }
    readUShort() {
        let code = '>H';
        let length = 2;
        return this.readf(code, length)[0];
    }
    readFloat() {
        let code = '>f';
        let length = 4;
        return this.readf(code, length)[0];
    }
    readDouble() {
        let code = '>d';
        let length = 8;
        return this.readf(code, length)[0];
    }
    readLongLong() {
        let code = '>q';
        let length = 8;
        return this.readf(code, length)[0];
    }
    readByte() {
        return this.read(1)[0];
    }
    readBoolean() {
        return this.readByte() === 0;
    }
    readSpaceColor() {
        let colorSpace = this.readShort();
        let colorComponent = (function () {
            let i = 0;
            let res = [];
            while (i < 4) {
                res.push(this.readShort() >> 8);
                i++;
            }
            return res;
        })();
        return {
            colorSpace,
            components: colorComponent
        };
    }
    readPathNumber() {
        const a = this.readByte();
        const arr = this.read(3);
        const b1 = arr[0] << 16;
        const b2 = arr[1] << 8;
        const b3 = arr[2];
        const b = b1 | b2 | b3;
        return a + b / Math.pow(2, 24);
    }
    readUnicodeString() {
        var bf = this.read(this.readInt() * 2);
        return Iconv.decode(new Buffer(bf), 'utf-16be').replace(/\u0000/g, '');
    }
    ;
}
exports.default = File;
//# sourceMappingURL=file.js.map