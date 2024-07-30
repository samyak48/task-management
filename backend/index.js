const express = require('express')
const dbSetup = require('./db/db-setup')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/userRoutes')
const taskRouter = require('./routes/taskRouter')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config({ path: './process.env' })

const PORT = process.env.PORT || 5000

const app = express()

dbSetup()

app.use(cookieParser())

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/user', userRouter)

app.use('/task', taskRouter)

app.listen(PORT, () => console.log(`server listening on ${PORT}`))