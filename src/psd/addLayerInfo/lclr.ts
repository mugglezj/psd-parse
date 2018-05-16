export default function (file) {
    // Sheet Color setting
    const key = 'lclr'
    const color = [file.readInt(), file.readInt()]
    return {
        key,
        color
    }
}
