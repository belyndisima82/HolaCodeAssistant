const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const moment = require('moment');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('src/server/credentials.json');
AWS.config.update({region:'us-east-1'});
const multer = require("multer");
const fs = require("fs");
const att = require('../database/mysql.js');
const bodyParser = require("body-parser");
const messagesArr = [];

app.use(bodyParser.json());


if (process.env.NODE_ENV !== 'production') {
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpack = require('webpack')
    const config = require('../../webpack/webpack.dev')
    const compiler = webpack(config)

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }))
    app.use(webpackHotMiddleware(compiler))
}

app.use(express.static(path.join(__dirname, '../../dist')))

app.get('/', (req, res) => {
    res.sendFile(__dirname, 'dist/index.html')
})

const User = require('./classes/User')
const UserCollection = new (require('./classes/UserCollection'))

io.on('connection', (socket) => {

    //When the client emits 'user joined', this executes
    socket.on('user joined', (username, picture, callback = null) => {
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

            messagesArr.map(message =>
              socket.emit('message', message))

        })
    })

    //When the client emits 'message', this executes
    socket.on('message', body => {
        createMessage(socket, body, 'normal', message => {
            //Sends the message to the clients
            io.emit('message', message);
            messagesArr.push(message)

            att.addMessages(message.author, message.createdAt, message.body, (err, results) => {
              if (err) {
                console.log(err)
              } else {
                console.log(results);
              }
            });
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


// rekognition
var rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'});

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, "./public/uploads/")
   },
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({storage: storage}).single("picture");


app.post("/upload", function (req, res) {
   upload(req, res, function (err) {
      if(err instanceof multer.MulterError) {
        // handle error
      } else {
        const uploadedImage = req.body.picture;
        var buffImage = new Buffer(uploadedImage.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
        searchByImage(buffImage, res);
      }
   });
})

/* This operation detects faces in an image and adds them to the specified Rekognition collection. */

function searchByImage(image, res) {
  var params = {
   CollectionId: "holacode",
   Image: {
     Bytes: image /* Strings will be Base-64 encoded on your behalf */
   }
 };
  rekognition.searchFacesByImage(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else  {
      if(data.FaceMatches.length > 0) {
        var todayDate = new Date();
        var picId = 'Belinda'

        att.addAttendance(todayDate, picId, todayDate, (err, results) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.send('Hi Belinda').end();
          }
        })
      } else {
        res.send('Your face is not Recognized').end();
      }}
  });
}
  app.post('/bookmarks', function(req, res){
    let bookmark = req.body.bookmark
    att.addBookmark(bookmark,(err, results) =>{
      if(err){
        console.log(err)
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
      }
    })
  })

  app.get('/bookmarks', function(req, res){
    att.getBookmarks((err, results) =>{
      if(err){
        console.log(err)
        res.sendStatus(500);
      }else{
        res.status(200).json(results);
      }
    })
  })



server.listen(PORT, (error) => console.log(error ? error : `http://localhost:${PORT}`))
