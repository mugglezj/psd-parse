export default {
    id: 'luni',
    parse: function(file){
        return file.readUnicodeString();
    }
};