import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import connectDB from './connectMongoDb.js'

dotenv.config()
connectDB()
const app = express();
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());


app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)

app.get('/',(req, res) => {
  res.send("This is a stack overflow clone API")
})

const PORT = process.env.PORT || 5000

const CONNECTION_URL = "mongodb+srv://kartikkotnala20:gQAZMyOYgoJl8WIB@stack-overflow-clone.6i2fslo.mongodb.net/?retryWrites=true&w=majority&appName=stack-overflow-clone"

mongoose.connect( CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
     .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT} `)}))
     .catch((err) => Console.log(err.message))



