import File from './psd/file'
import Header from './psd/header'
import Resources from './psd/resources'
import LayerMask from './psd/layerMaskInfo'
export default class PSD {
    file:File
    parsed:Boolean = false
    header :Header
    resources: object
    constructor(data) {
        this.file = new File(data)
    }
    parse() {
        if (this.parsed) return

        this.parseHeader()
        this.parseResources()
        this.parseLayerMask()
        this.parsed = true
    }
    parseHeader() {
        this.header = new Header(this.file)
        this.header.parse()
    }
    parseResources(){
        let resources = new Resources(this.file)

        let a = resources.parse()
    }
    parseLayerMask() {
        let layerMask = new LayerMask(this.file)
        layerMask.parse()
    }
}