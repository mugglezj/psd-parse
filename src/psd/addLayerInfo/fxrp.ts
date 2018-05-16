export default function (file) {
    // protected setting
    const key = 'fxrp'
    const refrencePoint = [file.readDouble(), file.readDouble()]
    return {
        key,
        refrencePoint
    }
}
