import Util from './util'
import File from './file'
import layerLinks from './resources/layer_links'
import slices from './resources/slices'

let Resources = {}
Resources[layerLinks.id] = layerLinks
Resources[slices.id] = slices


export default class Resource {
    Section = {}
    file: File
    id = null
    sig: string
    length = 0
    name = ''

    constructor(file) {
        this.file = file
    }

    parse() {
        this.sig = this.file.readString(4) //sig=8BIM
        this.id = this.file.readShort()
        const nameSize = this.file.readByte()//pascal string; first byte meas length
        const nameLength = Util.pad2(nameSize + 1) - 1
        // todo empty name,something wrong here
        this.name = this.file.readString(nameLength)
        this.length = Util.pad2(this.file.readInt())
        let block: any = {}
        if (Resources[this.id]) {
            // console.log(this.id)
            block[this.id] = Resources[this.id].parse(this.file, this.length)
        } else {
            this.file.seek(this.length, true)
        }
        return {id: this.id, detail: block[this.id]}
    }

}