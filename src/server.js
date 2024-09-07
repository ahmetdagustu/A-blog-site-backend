require('dotenv').config()

const PORT = 3000
const express=require('express')
const app = express()
const categoryRoutes = require('./routes/category')

app.use(express.json())
app.use('/categories', categoryRoutes);


app.listen(PORT, () => {
    console.log('Sunucu Ayakta')
})