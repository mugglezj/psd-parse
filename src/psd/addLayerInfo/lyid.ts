export default function (file) {
    // layer id 和文档中的不一样
    const key = 'lyid'
    const id = file.readInt()
    return {
        key,
        id
    }
}
