export default function (file) {
    // protected setting
    const key = 'shmd'
    const count = file.readInt()
    const res = []
    for (let i = 0; i < count; i++) {
        let data:any = {
            sign: file.readInt(),
            key: file.readInt(),
            copyOfSheetDuplication: file.readByte(),
            padding: file.seek(3, true),
            length: file.readInt(),
        }
        data.unDocumentedData = file.readString(data.length)
        res.push(data)
    }

    return {
        key,
        res
    }
}
