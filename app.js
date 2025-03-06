require('dotenv').config();
const express = require("express")
const cors = require("cors")
const userRouter = require('./router/users.js')
const storageRouter = require('./router/storage.js')
const trackRouter = require('./router/tracks.js')
const authRouter = require('./router/auth.js')
const dbConnect = require('./config/mongo')
const app = express()
//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors())
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/storage', storageRouter)
app.use('/api/tracks', trackRouter)
app.use('/api/auth', authRouter)
app.use(express.static("storage")) // http://localhost:3000/file.jpg
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})
dbConnect()