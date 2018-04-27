export default class layerLinks {
    static id = 1026
    name = 'layerLink'
    static parse(file, size) {
        var linkArr = []
        var end = file.tell() + size;
        while (end > file.tell()) {
            linkArr.push(file.readShort());
        }
        // file.tell();
        return linkArr.reverse();
    }

}