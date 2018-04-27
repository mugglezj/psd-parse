import File from '../File'
export default class BlendingRange{
    file: File
    constructor(file){
        this.file = file
    }
    parse() {
        const file = this.file
        const length = file.readInt()
        const endPos = file.tell()+length
        let blendingRange:any = {}
        blendingRange.gray = {
            source:{
                black: [file.readByte(), file.readByte()],
                white: [file.readByte(), file.readByte()]
            },
            dist:{
                black: [file.readByte(), file.readByte()],
                white: [file.readByte(), file.readByte()]
            }
        }

        const num = (length-8)/8
        blendingRange.channels = []

    }
}