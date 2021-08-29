const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb+srv://lakshan:123Samitha@cluster0.inao4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const alienRouter = require('./routes/products')
app.use('/aliens',alienRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

// app.listen(3000, () => {
//     console.log('Server started')
// })


