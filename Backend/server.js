import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import DBConnect from './Middleware/DatabaseConnection.js'
import userRouter from './Routers/userRouter.js'
import adminRouter from './Routers/adminRouter.js'

config()
const app = express()

app.use(express.json())
app.use(cors())
DBConnect()

app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)

const port = process.env.PORT || 3000;
app.listen(port,
    () => console.log(`Server running on PORT: ${port}`)
)