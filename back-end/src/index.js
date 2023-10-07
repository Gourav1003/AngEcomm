const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
require('./db/mongoose')

app.use(cors())
app.use(bodyParser.json())
app.use('/products',require('./routes/product'))
app.use('/users',require('./routes/users'))
app.use('/cart',require('./routes/cart'))
const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`App is running on Port ${PORT}`)
})