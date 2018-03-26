module.exports = class User {
    constructor(username, picture) {
        this.username = username
        //Stores the value of the 'picture' argument, if the value is not set then it generates a random picture (between 0 and 8)
        this.picture = picture || Math.floor(Math.random() * 9)
    }
}