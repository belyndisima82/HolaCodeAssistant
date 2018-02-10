const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8080
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const moment = require('moment')

if(process.env.NODE_ENV !== 'production') {
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

const users = {}

io.on('connection', (socket) => {

    //When the client emits 'user joined', this executes
    socket.on('user joined', (username, callback) => {
        //Store user data
        users[socket.id] = {
            username,
            //Generate random image for the user
            //the value of this key will be a number between 0 and 8
            //it will represent the name of the image from the images folder
            //for example if the value is 7 then the user image will be images/7.jpg
            picture: Math.floor((Math.random() * 9))
        }

        callback(users[socket.id])

        //Sends the list of users
        io.emit('users list', users)

        //Sends the message to the clients (except the sender)
        const message = createMessage(socket.id, `${users[socket.id].username} has joined to the channel.`, true)
        message.systemMessageType = 'login'
        socket.broadcast.emit('message', message)

        socket.broadcast.emit('play audio')
    })

    //When the client emits 'user reconnect', this executes
    socket.on('user reconnect', userdata => {
        //Store user data
        users[userdata.id] = {
            username: userdata.username,
            picture: userdata.picture
        }
    })

    //When the client emits 'message', this executes
    socket.on('message', body => {
        //Sends the message to the clients
        const message =  createMessage(socket.id, body, false)
        io.emit('message', message)

        socket.broadcast.emit('play audio')
    })

    //When the client emits 'username exists', this executes
    socket.on('username exists', (username, callback) => {
        callback(usernameExists(username))
    })

    //When the user disconnects, this executes
    socket.on('disconnect', () => {
        if(users[socket.id]) {
            //Sends the message to the clients (except the sender)
            const message = createMessage(socket.id, `${users[socket.id].username} has left the channel.`, true)
            message.systemMessageType = 'logout'
            socket.broadcast.emit('message', message)

            socket.broadcast.emit('play audio')

            //Remove from the users object
            delete users[socket.id]

            //Sends the list of users to the current sockets
            socket.broadcast.emit('users list', users)
        }
    })

})

//returns an object that contains information about the message
const createMessage = (socketID, body, isSystemMessage) => ({    
    author: users[socketID].username,
    picture: users[socketID].picture,
    body,
    createdAt: moment().format('HH:mm:ss'),
    isSystemMessage
})

//Checks if the given username is available
//If the username is already taken it return true, otherwise false
const usernameExists = username => 
    Object.keys(users).some(key => 
        users[key].username === username
    )

server.listen(PORT, (error) => console.log(error ? error : `http://localhost:${PORT}`))