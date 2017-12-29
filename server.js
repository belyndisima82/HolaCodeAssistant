const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8080
const server = require('http').createServer(app)
const io = require('socket.io')(server)

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

io.on('connection', (socket) => {

    socket.on('disconnect', () => {})

})

server.listen(PORT, (error) => console.log(error ? error : `http://localhost:${PORT}`))