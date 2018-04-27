import File from '../File'
export default class Mask{
    file: File
    constructor(file){
        this.file = file
    }
    parse() {
        let file = this.file
        const size = file.readInt()
        const endPos = file.tell()+size
        if (size == 0) return null
        const top = file.readInt()
        const left = file.readInt()
        const bottom = file.readInt()
        const right = file.readInt()
        const defaultColor = file.readByte()
        console.log(defaultColor)
        const flag = file.readByte()
        console.log(flag)
        return {
            top: top,
            right: right,
            bottom: bottom,
            left: left,
            width: right - left,
            height: bottom - top,
            defaultColor: defaultColor
        }
    }
}