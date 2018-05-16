export default function (file) {
    // Unicode Layer name

    const key = 'luni'
    const layerName = file.readUnicodeString()
    return {
        key,
        layerName,
    }
}
