require('./database.js')
const express = require('express')
const cors = require('cors')
const uploader = require('express-fileupload')
const http = require('http')
const morgan = require('morgan')
const {Server, fetchUserId} = require('socket.io')
const { info } = require('console')



const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        origin: "*"
    }
})

let users =[]
io.on("connection", (socket)=>{
    console.log(`Nuevo usuario conectado con id ${socket.id}`)
    
    io.on("chatuser", (id)=>{
        users[id] = socket.id
        io.emit("connected", (users)=>{
            socket.broadcast.emit("arrayUsers", users)
        } )
    })

    io.emit("newconnection",()=>{
        socket.id
    })

    
    io.on("message", (message)=>{
        console.log(message)
        socket.broadcast.emit("message",{
            body: message,
            from: socket.id
        })
    })
})

const   PORT = process.env.PORT || 3001

server.listen(PORT, ()=>{
    console.log(`Puerto conectado en ${PORT}`)
})

app.use(uploader({
    temFileDir: './temp'
}))
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

//routers

app.use('/api/fotos', require('./routers/router.fotos'))
app.use('/api/user', require('./routers/router.users.js'))
app.use('/api/signin', require('./routers/router.auth.js'))

module.exports = app