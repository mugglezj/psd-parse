import Description from './description'
import * as parseEngineData from 'parse-engine-data'

import parseText from './texthelper'

export default function (file) {
    const key = 'tysh'
    const version = file.readShort()
    const transformInfo = {
        xx: file.readDouble(),
        xy: file.readDouble(),
        yx: file.readDouble(),
        yy: file.readDouble(),
        tx: file.readDouble(),
        ty: file.readDouble(),
    }
    const textVersion = file.readShort()
    const descriptorVersion = file.readInt()
    const textData = (new Description(file)).parse(file)
    textData.EngineData = parseEngineData(textData.EngineData);
    textData.parsed = parseText(textData)
    const warpVersion = file.readShort()
    const descriptorVersion2 = file.readInt()
    const warpData = (new Description(file)).parse(file)
    // const warpData = ''
    const position = {
        left: file.readDouble(),
        top: file.readDouble(),
        right: file.readDouble(),
        bottom: file.readDouble(),
    }

    const res = {
        key,
        version,
        transformInfo,
        textVersion,
        descriptorVersion,
        textData,
        warpVersion,
        descriptorVersion2,
        warpData,
        position
    }

    return res
}
