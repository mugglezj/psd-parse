export default function (file) {
    // Layer name source setting

    const key = 'clbl'
    const blendClippedElements = file.readByte()
    // parse padding
    file.seek(3, true)
    return {
        key,
        blendClippedElements,
    }
}
