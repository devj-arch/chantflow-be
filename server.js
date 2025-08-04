import express from "express"
import dotenv from 'dotenv'
import mantraRoutes from './routes/mantraRoutes.js'
import deityRoutes from './routes/deityRoutes.js'
import connectDB from "./config/db.js"

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Welcome to ChantFlow API.')
})

app.use('/mantras', mantraRoutes)

app.use('/deities', deityRoutes)

app.listen(PORT, () => console.log(`🚀 Server is running on ${PORT}`))
