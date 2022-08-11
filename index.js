import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ArticleRoutes from './routes/ArticleRoutes.js'
import UserRoutes from './routes/UserRoutes.js'
// import verifyToken from './verifyToken.js'
const app = express()
const port = 3001

dotenv.config()

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_CLIENT)
        .then(res => console.log('connected to mongo'))
}

app.use(express.json())
app.use(cors())
app.use(cookieParser())


// app.use(verifyToken)
app.use('/api/articles', ArticleRoutes)
app.use('/api/auth/', UserRoutes)
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong"
    return res.status(status).json({
      success: false,
      status,
      message
    })
  })


app.listen(port, () => {
    connectDB()
    console.log(`Example app listening on port ${port}`)
})