import File from './file'
import {baseInfo} from "./types";

export default class Header {
    file: File
    sig: string
    version: string
    reserved: string
    channels: number
    rows: string
    height: number // the height of psd
    cols: string
    width: number // the width of psd
    depth: number
    mode: number

    startPos:number
    endPos:number
    MODES = [
        'Bitmap',
        'GrayScale',
        'IndexedColor',
        'RGBColor',
        'CMYKColor',
        'HSLColor',
        'HSBColor',
        'Multichannel',
        'Duotone',
        'LabColor',
        'Gray16',
        'RGB48',
        'Lab48',
        'CMYK64',
        'DeepMultichannel',
        'Duotone16'
    ]

    constructor(file) {
        this.file = file
    }

    parse():baseInfo {
        this.startPos = this.file.tell()
        this.sig = this.file.readString(4)
        if (this.sig != '8BPS') {
            throw new Error(`Invalid file signature detected. Got: ${this.sig}. Expected 8BPS.`)
        }
        //Version: always equal to 1. Do not try to read the file if the version does not match this value. (**PSB** version is 2.)
        this.version = this.file.readUShort()
        // Reserved: must be zero.
        this.reserved = this.file.readf('i',6)[0]
        // The number of channels in the image, including any alpha channels. Supported range is 1 to 56.
        this.channels = this.file.readUShort()
        //The height of the image in pixels. Supported range is 1 to 30,000.(**PSB** max of 300,000.)
        this.rows = this.height = this.file.readUInt()
        // The width of the image in pixels. Supported range is 1 to 30,000.(*PSB** max of 300,000)
        this.cols = this.width = this.file.readUInt()
        // Depth: the number of bits per channel. Supported values are 1, 8, 16 and 32.
        this.depth = this.file.readUShort()
        // The color mode of the file. Supported values are: Bitmap = 0; Grayscale = 1; Indexed = 2; RGB = 3; CMYK = 4; Multichannel = 7; Duotone = 8; Lab = 9.
        this.mode = this.file.readUShort()
        let colorDataLen = this.file.readUInt()
        this.file.seek(colorDataLen, true)
        // let a = this.file.readf('>i', colorDataLen)[0]

        this.endPos = this.file.tell()

        return this.export()
    }
    modeName() {
        return this.MODES[this.mode]
    }
    export():baseInfo {
        let data:baseInfo = {
            width:this.width,
            height:this.height,
            colorMode:this.mode,
            colorDepth:this.depth,
            channels:this.channels,
        }
        return data
    }

}