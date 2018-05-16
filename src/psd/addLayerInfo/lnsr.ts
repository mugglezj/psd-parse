export default function (file) {
    // Layer name source setting

    const key = 'lnsr'
    const id = file.readInt()
    return {
        key,
        id,
    }
}
