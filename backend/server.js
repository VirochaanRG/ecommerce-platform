import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import bodyParser from 'body-parser';
import path from 'path'
import morgan from 'morgan';
import cors from 'cors'


dotenv.config();
connectDB()

const app = express()

app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/products', productRoutes)
app.use('/cart/api/products', productRoutes)

app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use('/api/upload', uploadRoutes)





const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '\\uploads')))

console.log(process.env.NODE_ENV)
console.log(__dirname)
if (process.env.NODE_ENV === 'production') {
  console.log('here')
  app.use(express.static(path.join(__dirname, '\\frontend\\build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))