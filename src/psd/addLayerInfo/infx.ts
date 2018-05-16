export default function (file) {
    // Blend interior elements
    const key = 'infx'
    const blendInteriorElements = file.readByte()
    // parse padding
    file.seek(3, true)
    return {
        key,
        blendInteriorElements,
    }
}
