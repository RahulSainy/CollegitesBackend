import path from 'path'
import express from 'express'
// const mongoose = require('mongoose') 
// no need for this above /

import dotenv from 'dotenv'


import connectDB from './config/db.js'
import bodyParser from 'body-parser'

import productRoutes from './routes/product.js'
import userRoutes from './routes/user.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()
connectDB()

const app = express();
app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/uploads', uploadRoutes)

// dont know ho it works ......................
app.get('/api/config/cloudinary', (req, res) => {
  res.send(process.env.CLOUDINARY_URL)
})
app.get('/api/config/cloudinarypreset', (req, res) => {
  res.send(process.env.CLOUDINARY_UPLOAD_PRESET)
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

// till here .........................


// used better aproach outsourcing in env

// mongoose.connect("mongodb+srv://kradekidrahul:abc1243@cluster0.cx9gl7f.mongodb.net/?retryWrites=true&w=majority"
// ).then(() => {
//     console.log("Connected to database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});



// app.use("/api/user", userRoutes)
// app.use("/api/product", productRoutes)
export default app;
