export default function (file) {
    // Knockout setting
    const key = 'knko'
    const knockOut = file.readByte()
    // parse padding
    file.seek(3, true)
    return {
        key,
        knockOut,
    }
}
