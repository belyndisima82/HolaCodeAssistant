module.exports = class Collection extends Map {
    /** 
     * Returns the values as array.
     * @returns {Array}
    */
    list() {
        return [...this.values()]
    }
}