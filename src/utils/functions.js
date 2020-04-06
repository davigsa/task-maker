module.exports = {
    parseStringInArray(string){
        return string.split(',').map(word => word.trim());
    }
};