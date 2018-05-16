"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("./psd/file");
const header_1 = require("./psd/header");
const resources_1 = require("./psd/resources");
const layerMaskInfo_1 = require("./psd/layerMaskInfo");
const imageData_1 = require("./psd/imageData");
class PSD {
    constructor(data) {
        this.parsed = false;
        this.file = new file_1.default(data);
    }
    parse() {
        if (this.parsed)
            return;
        this.parseHeader();
        this.parseResources();
        this.parseLayerMask();
        this.parseImageData();
        this.parsed = true;
        return this;
    }
    parseHeader() {
        this.header = new header_1.default(this.file);
        this.baseInfo = this.header.parse();
    }
    parseResources() {
        let resources = new resources_1.default(this.file);
        let a = resources.parse();
    }
    parseLayerMask() {
        let layerMask = new layerMaskInfo_1.default(this.file);
        this.layerMaskInfo = layerMask.parse(this.baseInfo);
    }
    parseImageData() {
        let imageData = new imageData_1.default(this.file);
        imageData.parse();
        imageData.saveAsPng(this.baseInfo, './tests.png');
    }
    getLayerByName(name) {
        const layer = '';
        return layer;
    }
    getTree() {
        // if (this.tree) return this.tree
        // if(!this.childrenWithGroup) this.getDescendats()
        this.getDescendats();
        var layers = this.childrenWithGroup;
        var current = [];
        var queue = [];
        layers.forEach(function (el) {
            var groupSig = el.additional['lsct'];
            if (groupSig && (groupSig.type === 1 || groupSig.type === 2)) {
                // group start
                var g = el;
                g.type = 'group';
                g.children = [];
                current.push(g);
                queue.push(current);
                current = g.children;
            }
            else if (groupSig && groupSig.type === 3) {
                // group end
                current = queue.pop();
            }
            else {
                // other layer ,not group
                current.push(el);
            }
        });
        let _tree = current;
        return _tree;
    }
    getDescendats() {
        // 获取 扁平化的图层
        // if(_children) return _children;
        let _children = [];
        let _childrenWithGroup = [];
        function Layer(l) {
            function text() {
                //文本内容
                // if (this.additional['TySh']) {
                //     return this.additional['TySh']['textData']['Txt ']
                // }
                // else {
                //     console.error('This layer (%s) is not a text layer', this.get('layerName'));
                //     return false;
                // }
            }
            function snippets() {
                //文本图层的详细内容
                // if (this.additional['TySh']) {
                //     //it`s an array
                //     // return parseTextLayer(this.additional['TySh'])
                // }
                // else {
                //     console.error('This layer (%s) is not a text layer', this.get('layerName'));
                //     return false;
                // }
            }
            function _get(name) {
                if (this[name]) {
                    return this[name];
                }
                // else if (this.additional[name]) {
                //     return this.additional[name];
                // }
                else {
                    console.error('%s attribute not exist', name);
                    return false;
                }
            }
            l.get = function (name) {
                switch (name) {
                    case 'layerName':
                        return this.additional['luni'];
                    case 'text':
                        return text.call(this);
                    case 'wordSnippets':
                        return snippets.call(this);
                    default:
                        return _get.call(this, name);
                }
            };
            return l;
        }
        this.layerMaskInfo.layerInfo.layers.forEach(function (l) {
            var layer = new Layer(l);
            _childrenWithGroup.push(layer);
            if (!l.additional['lsct'])
                _children.push(layer);
        });
        this.childrenWithGroup = _childrenWithGroup;
        return _children;
    }
}
exports.default = PSD;
//# sourceMappingURL=psd.js.map