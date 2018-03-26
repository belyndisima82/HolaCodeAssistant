const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8080
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const moment = require('moment')

if (process.env.NODE_ENV !== 'production') {
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpack = require('webpack')
    const config = require('./webpack.dev')
    const compiler = webpack(config)

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }))
    app.use(webpackHotMiddleware(compiler))
}

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
    res.sendFile(__dirname, '/dist/index.html')
})


const User = require('./src/classes/User')
const UserCollection = new (require('./src/classes/UserCollection'))

io.on('connection', (socket) => {
    //When the client emits 'user joined', this executes
    socket.on('user joined', (username, picture = null, callback = null) => {
        //Create new user
        const user = new User(username, picture)

        //Store user
        UserCollection.set(socket.id, user)

        //If the callback function exists then it invokes with the user object as parameter
        if (callback && typeof callback === 'function') callback(user)

        //Sends a list of users to the clients
        io.emit('users list', UserCollection.list())

        createMessage(socket, '', 'login', message => {
            //Sends the message to the clients (except the sender)
            socket.broadcast.emit('message', message)
        })
    })

    //When the client emits 'message', this executes
    socket.on('message', body => {
        createMessage(socket, body, 'normal', message => {
            //Sends the message to the clients
            io.emit('message', message)
        })
    })

    //When the client emits 'username exists', this executes
    socket.on('username exists', (username, callback) => {
        callback(UserCollection.isUsernameExists(username))
    })

    //When the user disconnects, this executes
    socket.on('disconnect', () => {
        if (UserCollection.has(socket.id)) {

            createMessage(socket, '', 'logout', message => {
                //Sends the message to the clients (except the sender)
                socket.broadcast.emit('message', message)
            })

            //Delete user
            UserCollection.delete(socket.id)

            //Sends a list of users to the clients (except the sender)
            socket.broadcast.emit('users list', UserCollection.list())

        }
    })
})

/**
 * Creates an object, that contains information about the message, and pass it to the callback function as parameter
 * @param {Object} socket Socket instance
 * @param {string} body Body of the message
 * @param {string} type Message type (normal, login or logout)
 * @param {Function} callback 
 */
const createMessage = (socket, body, type, callback) => {
    if (UserCollection.has(socket.id)) {
        const { username, picture } = UserCollection.get(socket.id)

        if (type === 'login') body = `${username} has joined to the channel.`
        if (type === 'logout') body = `${username} has left the channel.`

        callback({
            author: username,
            author_id: socket.id,
            picture,
            body,
            createdAt: moment().format('HH:mm:ss'),
            type,
            isSystemMessage: type === 'login' || type === 'logout'
        })
    }
}

server.listen(PORT, (error) => console.log(error ? error : `http://localhost:${PORT}`))