import express from "express"
import dotenv from 'dotenv'
import mantraRoutes from './routes/mantraRoutes.js'
import deityRoutes from './routes/deityRoutes.js'
import authRoutes from './routes/authRoutes.js'
import connectDB from "./config/db.js"
import cors from 'cors'
import cookieParser from "cookie-parser"

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

// app.use(cors({
//   origin: 'http://localhost:5173', // Vite dev server
//   credentials: true // if you're using cookies/sessions
// }));

const allowedOrigins = [
  'http://localhost:5173',  // local dev
  'https://chantflow-fe.onrender.com'  // production
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Welcome to ChantFlow API.')
})


app.use('/mantras', mantraRoutes)

app.use('/deities', deityRoutes)

app.use('/auth', authRoutes)

app.listen(PORT, () => console.log(`🚀 Server is running on ${PORT}`))
