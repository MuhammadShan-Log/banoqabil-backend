// Configs
require('dotenv').config()

// Imports
const express = require('express');
const dbConnection = require('./config/dbConnection');
const app = express()
const URL = process.env.MONGO_DB_URL
const PORT = process.env.PORT

// DB Connection
dbConnection(URL);

// Middle Ware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Routes Import
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const globalErrorHandler = require('./middlewares/globalErrorHandler');

// Routes
app.use('/auth', authRoutes)
app.use('/product', productRoutes)
app.use('/category', categoryRoutes)

app.use('/', (req, res)=>{
    res.send(`Server is running.`)
})


app.use(globalErrorHandler)

app.listen(PORT, () => console.log(`Server is started on PORT: ${PORT}`));
