import * as fs from 'fs'
import File from './file'
import {PNG} from 'pngjs'
import PSD from '../psd'
import imageFunc from './imageFunc'

export default class imageData {
    file: File

    constructor(file) {
        this.file = file
    }

    parse() {
        // const file = this.file
        // let compression = file.readShort()
        // console.log(compression)
    }

    saveAsPng(baseInfo,output) {
        const pixelData = this.toImageData(baseInfo
        const png = new PNG({
            width: baseInfo.width,
            height: baseInfo.height,
            filterType: 4
        })
        if (pixelData) {
            png.data = pixelData
            png.pack().pipe(fs.createWriteStream(output))
        }
    }

    toImageData(baseInfo) {
        const file = this.file
        const compression = file.readShort()

        const channel = new imageFunc.PSDFormat[compression](file,baseInfo)

        const channelInfo = channel.channelInfo

        const layer = {
            width: baseInfo.width,
            height: baseInfo.height,
            channelInfo: channelInfo,
            colorMode: baseInfo.colorMode,
        }
        const pixelData = imageFunc.mergeImageData(layer,baseInfo)
        return pixelData
    }
}