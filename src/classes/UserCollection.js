const Collection = require('./Collection')

module.exports = class UserCollection extends Collection {
    /**
     * Checks if the given username is available.
     * @param {string} username
     * @returns {boolean} If the username is already taken it return true, otherwise false.
     */
    isUsernameExists(username) {
        return this.list().some(value => value.username === username)
    }
}